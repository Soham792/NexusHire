import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/db'
import Job from '@/lib/models/Job'
import CandidateProfile from '@/lib/models/CandidateProfile'
import Application from '@/lib/models/Application'
import { callGroqJSON, MODELS } from '@/lib/groq'
import { PROMPTS } from '@/lib/ai/prompts'

export async function GET(req: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'candidate') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const jobId = searchParams.get('jobId')
  const applicationId = searchParams.get('applicationId')
  const regenerate = searchParams.get('regenerate') === 'true'

  await connectDB()

  const profile = await CandidateProfile.findOne({ userId: session.user.id }).lean() as {
    skills?: Array<{ skill?: string; name?: string; proficiency?: string; level?: string }>
  } | null

  let job: { title?: string; requiredSkills?: Array<{ skill: string; weight: number }> } | null = null
  let existingGap: { missingSkills?: unknown[] } | null = null

  if (jobId) {
    job = await Job.findById(jobId).lean()
  } else if (applicationId) {
    const app = await Application.findById(applicationId).lean() as {
      jobId: unknown
      skillGapPath?: { missingSkills?: unknown[] }
    } | null
    if (app) {
      job = await Job.findById(app.jobId).lean()
      existingGap = app.skillGapPath ?? null
    }
  }

  if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 })

  // Only use the cache if it has real content and regenerate isn't forced
  if (!regenerate && existingGap && (existingGap.missingSkills?.length ?? 0) > 0) {
    return NextResponse.json(existingGap)
  }

  // Find missing skills — compare against both {skill} and {name} field shapes
  const candidateSkillNames = (profile?.skills || [])
    .map((s) => (s.skill || s.name || '').toLowerCase())
    .filter(Boolean)

  const requiredSkills = job.requiredSkills || []

  const missingSkills = requiredSkills
    .filter((s) => {
      const jSkill = s.skill.toLowerCase()
      return !candidateSkillNames.some((c) => c.includes(jSkill) || jSkill.includes(c))
    })
    .slice(0, 5)

  // If candidate has all required skills (or job has no required skills)
  if (missingSkills.length === 0) {
    const result = {
      missingSkills: [],
      allSkillsMatched: true,
      matchedCount: candidateSkillNames.length,
      requiredCount: requiredSkills.length,
      timeline: null,
      steps: [],
    }
    return NextResponse.json(result)
  }

  try {
    interface SkillGapResult {
      skill: string
      weeklyPlan: string[]
      resources: Array<{ title: string; url: string; type: string }>
    }

    const plans = await Promise.all(
      missingSkills.map(async (s) => {
        const prompt = PROMPTS.SKILL_GAP_PATH(s.skill)
        try {
          return await callGroqJSON<SkillGapResult>(MODELS.SMART, prompt)
        } catch {
          return { skill: s.skill, weeklyPlan: [], resources: [] }
        }
      })
    )

    const result = {
      missingSkills: missingSkills.map((s, i) => ({
        skill: s.skill,
        priority: s.weight === 3 ? 'high' : s.weight === 2 ? 'medium' : 'low',
        resources: plans[i]?.resources || [],
        weeklyPlan: plans[i]?.weeklyPlan || [],
      })),
      allSkillsMatched: false,
      timeline: `${missingSkills.length * 2}–${missingSkills.length * 3} weeks`,
      steps: plans.flatMap((p, pi) =>
        (p.weeklyPlan || []).map((focus, wi) => ({
          week: pi * 3 + wi + 1,
          focus: p.skill,
          tasks: [focus],
        }))
      ).slice(0, 8),
    }

    if (applicationId) {
      await Application.findByIdAndUpdate(applicationId, { skillGapPath: result })
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error('Skill gap error:', err)
    return NextResponse.json({ error: 'Failed to generate analysis' }, { status: 500 })
  }
}
