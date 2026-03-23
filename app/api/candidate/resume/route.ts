import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/db'
import CandidateProfile from '@/lib/models/CandidateProfile'
import { uploadResume } from '@/lib/s3'
import { parseResume } from '@/lib/ai/parseResume'
import pdf from 'pdf-parse'

export async function POST(req: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'candidate') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('resume') as File
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload to S3
    const s3Key = `resumes/${session.user.id}/${Date.now()}-${file.name}`
    const resumeUrl = await uploadResume(buffer, s3Key, file.type)

    // Parse PDF text
    let extractedText = ''
    try {
      const pdfData = await pdf(buffer)
      extractedText = pdfData.text
    } catch {
      console.warn('PDF parse failed')
    }

    // AI parse
    let parsed: Awaited<ReturnType<typeof parseResume>> | null = null
    if (extractedText) {
      try {
        parsed = await parseResume(extractedText)
      } catch {
        console.warn('AI parse failed')
      }
    }

    await connectDB()

    const updateData: Record<string, unknown> = { resumeUrl }
    if (parsed) {
      if (parsed.skills?.length) updateData.skills = parsed.skills.map((s) => ({ name: s.skill, level: s.proficiency || 'intermediate' }))
      if (parsed.experience?.length) updateData.experience = parsed.experience
      if (parsed.education?.length) updateData.education = parsed.education
      if (parsed.headline) updateData.bio = parsed.headline
    }

    const profile = await CandidateProfile.findOneAndUpdate(
      { userId: session.user.id },
      updateData,
      { new: true, upsert: true }
    )

    return NextResponse.json({ resumeUrl, parsed, profile })
  } catch (err) {
    console.error('Resume upload error:', err)
    return NextResponse.json({ error: 'Failed to process resume' }, { status: 500 })
  }
}
