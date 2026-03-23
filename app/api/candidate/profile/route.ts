import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/db'
import CandidateProfile from '@/lib/models/CandidateProfile'
import { generateEmbedding } from '@/lib/nim'

export async function GET() {
  const session = await auth()
  if (!session || session.user.role !== 'candidate') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  await connectDB()
  const profile = await CandidateProfile.findOne({ userId: session.user.id }).lean()
  return NextResponse.json(profile || {})
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'candidate') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    await connectDB()

    // Build a text blob for embedding
    const skillsText = (body.skills || []).map((s: { name: string }) => s.name).join(', ')
    const expText = (body.experience || [])
      .map((e: { title: string; company: string; description: string }) => `${e.title} at ${e.company}: ${e.description}`)
      .join('. ')
    const textBlob = `${body.headline || ''} ${skillsText} ${expText} ${body.bio || ''}`

    let embedding: number[] = []
    try {
      embedding = await generateEmbedding(textBlob)
    } catch {
      console.warn('Embedding generation failed, skipping')
    }

    // Calculate profile strength
    let strength = 0
    if (body.headline) strength += 10
    if (body.bio) strength += 10
    if ((body.skills || []).length > 0) strength += 20
    if ((body.experience || []).length > 0) strength += 25
    if ((body.education || []).length > 0) strength += 15
    if ((body.projects || []).length > 0) strength += 10
    if (body.resumeUrl) strength += 10

    const profile = await CandidateProfile.findOneAndUpdate(
      { userId: session.user.id },
      { ...body, embedding, profileStrength: strength },
      { new: true, upsert: true }
    )

    return NextResponse.json(profile)
  } catch (err) {
    console.error('Profile update error:', err)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
