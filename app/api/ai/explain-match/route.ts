import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/db'
import Application from '@/lib/models/Application'
import Job from '@/lib/models/Job'
import User from '@/lib/models/User'
import CandidateProfile from '@/lib/models/CandidateProfile'
import { callGroq, MODELS } from '@/lib/groq'
import { PROMPTS } from '@/lib/ai/prompts'

export async function GET(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const applicationId = searchParams.get('applicationId')
  if (!applicationId) return NextResponse.json({ error: 'applicationId required' }, { status: 400 })

  await connectDB()

  const app = await Application.findById(applicationId).lean() as {
    candidateId: unknown
    jobId: unknown
    matchScore: number
    skillBreakdown?: Array<{ skill: string; match: string }>
  } | null
  if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const [job, user] = await Promise.all([
    Job.findById(app.jobId).select('title').lean() as Promise<{ title?: string } | null>,
    User.findById(app.candidateId).select('name').lean() as Promise<{ name?: string } | null>,
  ])

  try {
    const prompt = PROMPTS.EXPLAIN_MATCH(
      app.matchScore,
      app.skillBreakdown || [],
      user?.name || 'Candidate',
      job?.title || 'Role'
    )
    const explanation = await callGroq(MODELS.SMART, prompt)
    return NextResponse.json({ explanation, matchScore: app.matchScore })
  } catch (err) {
    console.error('Explain match error:', err)
    return NextResponse.json({ error: 'Failed to explain match' }, { status: 500 })
  }
}
