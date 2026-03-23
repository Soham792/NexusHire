import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/db'
import Application from '@/lib/models/Application'
import Job from '@/lib/models/Job'
import { triggerStageUpdate } from '@/lib/pusher-server'

const VALID_STAGES = ['applied', 'under_review', 'shortlisted', 'interview', 'decision', 'outcome'] as const
type Stage = typeof VALID_STAGES[number]

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session || session.user.role !== 'recruiter') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { stage, note, outcome } = await req.json()
    if (!VALID_STAGES.includes(stage as Stage)) {
      return NextResponse.json({ error: 'Invalid stage' }, { status: 400 })
    }

    await connectDB()

    const application = await Application.findById(params.id).lean() as { jobId: unknown; candidateId: unknown; _id: unknown } | null
    if (!application) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Verify recruiter owns this job
    const job = await Job.findOne({ _id: application.jobId, recruiterId: session.user.id }).lean()
    if (!job) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const updated = await Application.findByIdAndUpdate(
      params.id,
      {
        stage,
        ...(outcome ? { outcome } : {}),
        $push: {
          stageHistory: {
            stage,
            timestamp: new Date(),
            note: note || '',
            changedBy: session.user.id,
          },
        },
      },
      { new: true }
    )

    // Pusher real-time notification
    try {
      await triggerStageUpdate(
        String(application.jobId),
        String(params.id),
        stage
      )
    } catch {
      console.warn('Pusher trigger failed')
    }

    return NextResponse.json(updated)
  } catch (err) {
    console.error('Stage update error:', err)
    return NextResponse.json({ error: 'Failed to update stage' }, { status: 500 })
  }
}
