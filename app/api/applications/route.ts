import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/db'
import Application from '@/lib/models/Application'
import Job from '@/lib/models/Job'
import CandidateProfile from '@/lib/models/CandidateProfile'
import { scoreMatch } from '@/lib/ai/scoreMatch'

export async function GET(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  await connectDB()

  if (session.user.role === 'candidate') {
    const applications = await Application.find({ candidateId: session.user.id })
      .sort({ createdAt: -1 })
      .lean() as Array<{ jobId: unknown; [key: string]: unknown }>

    const enriched = await Promise.all(
      applications.map(async (app) => {
        const job = await Job.findById(app.jobId).select('title companyName location status').lean()
        return { ...app, job }
      })
    )
    return NextResponse.json(enriched)
  }

  // Recruiter view
  const jobId = searchParams.get('jobId')
  if (!jobId) return NextResponse.json([])
  const job = await Job.findOne({ _id: jobId, recruiterId: session.user.id })
  if (!job) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const applications = await Application.find({ jobId }).sort({ matchScore: -1 }).lean()
  return NextResponse.json(applications)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'candidate') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { jobId, coverLetter } = await req.json()
    await connectDB()

    const existing = await Application.findOne({ candidateId: session.user.id, jobId })
    if (existing) {
      return NextResponse.json({ error: 'Already applied to this job' }, { status: 409 })
    }

    const [job, profile] = await Promise.all([
      Job.findById(jobId).lean() as Promise<{
        requiredSkills?: Array<{ skill: string; weight: number; type: string }>
        embedding?: number[]
        title?: string
        _id: unknown
      } | null>,
      CandidateProfile.findOne({ userId: session.user.id }).lean() as Promise<{
        skills?: Array<{ name: string }>
        embedding?: number[]
        experience?: unknown
      } | null>,
    ])

    if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 })

    let scoreResult: Awaited<ReturnType<typeof scoreMatch>> = {
      overall: 0, skillsMatch: 0, experienceMatch: 0, explanation: '', breakdown: [],
    }

    if (profile) {
      try {
        scoreResult = await scoreMatch(profile, job)
      } catch {
        if (job.embedding?.length && profile.embedding?.length) {
          const { cosineSimilarity } = await import('@/lib/nim')
          const cosScore = Math.round(cosineSimilarity(job.embedding, profile.embedding) * 100)
          scoreResult = { overall: cosScore, skillsMatch: cosScore, experienceMatch: cosScore, explanation: '', breakdown: [] }
        }
      }
    }

    // Estimate percentile rank against existing applicants
    const existingApps = await Application.find({ jobId }).select('matchScore').lean() as Array<{ matchScore: { overall?: number } | number }>
    let percentileRank = 100
    if (existingApps.length > 0) {
      const lower = existingApps.filter((a) => {
        const s = typeof a.matchScore === 'object' ? (a.matchScore?.overall ?? 0) : (a.matchScore ?? 0)
        return s < scoreResult.overall
      }).length
      percentileRank = Math.round((lower / existingApps.length) * 100)
    }

    const application = await Application.create({
      candidateId: session.user.id,
      jobId,
      coverLetter,
      matchScore: {
        overall: scoreResult.overall,
        skillsMatch: scoreResult.skillsMatch ?? scoreResult.overall,
        experienceMatch: scoreResult.experienceMatch ?? scoreResult.overall,
        explanation: scoreResult.explanation ?? '',
      },
      breakdown: scoreResult.breakdown ?? [],
      percentileRank,
      stage: 'applied',
      stageHistory: [{ stage: 'applied', timestamp: new Date(), note: 'Application submitted' }],
    })

    await Job.findByIdAndUpdate(jobId, { $inc: { applicantCount: 1 } })
    return NextResponse.json(application, { status: 201 })
  } catch (err) {
    console.error('Application error:', err)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
