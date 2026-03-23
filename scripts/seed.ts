import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const MONGODB_URI = process.env.MONGODB_URI!

async function main() {
  if (!MONGODB_URI) throw new Error('MONGODB_URI not set in .env.local')

  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')

  // Dynamic import models after connection
  const { default: Job } = await import('../lib/models/Job')
  const { default: User } = await import('../lib/models/User')
  const { default: CompanyProfile } = await import('../lib/models/CompanyProfile')

  // Clear existing seed data
  await Job.deleteMany({ companyName: 'Seed Corp' })
  console.log('Cleared old seed data')

  // Create sample recruiter
  let recruiter = await User.findOne({ email: 'recruiter@seedcorp.com' })
  if (!recruiter) {
    const bcrypt = await import('bcryptjs')
    recruiter = await User.create({
      name: 'Seed Recruiter',
      email: 'recruiter@seedcorp.com',
      passwordHash: await bcrypt.default.hash('password123', 10),
      role: 'recruiter',
      provider: 'credentials',
    })
    await CompanyProfile.create({
      userId: recruiter._id,
      companyName: 'Seed Corp',
      industry: 'Technology',
    })
    console.log('Created seed recruiter: recruiter@seedcorp.com / password123')
  }

  // Sample jobs
  const jobs = [
    {
      title: 'Senior Full-Stack Engineer',
      description: 'Build and scale our core platform. You will work on React frontend and Node.js backend services, with a focus on performance and reliability.',
      location: 'San Francisco, CA',
      locationType: 'hybrid',
      employmentType: 'full-time',
      roleLevel: 'senior',
      experienceRange: { min: 4, max: 8 },
      salaryRange: { min: 140000, max: 180000, currency: 'USD' },
      requiredSkills: [
        { skill: 'React', weight: 3, type: 'technical' },
        { skill: 'TypeScript', weight: 3, type: 'technical' },
        { skill: 'Node.js', weight: 2, type: 'technical' },
        { skill: 'PostgreSQL', weight: 2, type: 'technical' },
        { skill: 'System Design', weight: 2, type: 'domain' },
      ],
      cultureTags: ['fast-paced', 'collaborative', 'remote-friendly'],
    },
    {
      title: 'ML Engineer — LLM Applications',
      description: 'Build AI-powered products using large language models. Experience with fine-tuning, RAG, and production ML systems required.',
      location: 'Remote',
      locationType: 'remote',
      employmentType: 'full-time',
      roleLevel: 'mid',
      experienceRange: { min: 2, max: 6 },
      salaryRange: { min: 130000, max: 160000, currency: 'USD' },
      requiredSkills: [
        { skill: 'Python', weight: 3, type: 'technical' },
        { skill: 'LLMs', weight: 3, type: 'domain' },
        { skill: 'PyTorch', weight: 2, type: 'technical' },
        { skill: 'Vector Databases', weight: 2, type: 'tool' },
        { skill: 'RAG', weight: 3, type: 'domain' },
      ],
      cultureTags: ['research-oriented', 'autonomous', 'impact-driven'],
    },
    {
      title: 'Product Designer',
      description: 'Design delightful user experiences for our mobile and web products. You will own design from discovery to delivery.',
      location: 'New York, NY',
      locationType: 'onsite',
      employmentType: 'full-time',
      roleLevel: 'mid',
      experienceRange: { min: 3, max: 6 },
      salaryRange: { min: 100000, max: 130000, currency: 'USD' },
      requiredSkills: [
        { skill: 'Figma', weight: 3, type: 'tool' },
        { skill: 'User Research', weight: 2, type: 'domain' },
        { skill: 'Design Systems', weight: 3, type: 'domain' },
        { skill: 'Prototyping', weight: 2, type: 'technical' },
      ],
      cultureTags: ['design-led', 'user-centric', 'collaborative'],
    },
    {
      title: 'DevOps / Platform Engineer',
      description: 'Own our cloud infrastructure on AWS. Build CI/CD pipelines, improve observability, and ensure 99.9% uptime.',
      location: 'Austin, TX',
      locationType: 'hybrid',
      employmentType: 'full-time',
      roleLevel: 'senior',
      experienceRange: { min: 4, max: 10 },
      salaryRange: { min: 130000, max: 160000, currency: 'USD' },
      requiredSkills: [
        { skill: 'AWS', weight: 3, type: 'tool' },
        { skill: 'Kubernetes', weight: 3, type: 'tool' },
        { skill: 'Terraform', weight: 2, type: 'tool' },
        { skill: 'Docker', weight: 2, type: 'tool' },
        { skill: 'CI/CD', weight: 2, type: 'domain' },
      ],
      cultureTags: ['reliability-focused', 'on-call', 'automation-first'],
    },
    {
      title: 'Frontend Engineer — React Native',
      description: 'Build our mobile app with React Native. You will collaborate with design and backend teams to ship features for 1M+ users.',
      location: 'Remote',
      locationType: 'remote',
      employmentType: 'full-time',
      roleLevel: 'mid',
      experienceRange: { min: 2, max: 5 },
      salaryRange: { min: 100000, max: 130000, currency: 'USD' },
      requiredSkills: [
        { skill: 'React Native', weight: 3, type: 'technical' },
        { skill: 'TypeScript', weight: 3, type: 'technical' },
        { skill: 'iOS/Android', weight: 2, type: 'domain' },
        { skill: 'Redux', weight: 1, type: 'technical' },
      ],
      cultureTags: ['mobile-first', 'user-focused', 'async-friendly'],
    },
  ]

  const created = await Job.insertMany(
    jobs.map((j) => ({ ...j, recruiterId: recruiter._id, companyName: 'Seed Corp', status: 'active' }))
  )

  console.log(`Created ${created.length} seed jobs`)
  console.log('Seed complete! Login with: recruiter@seedcorp.com / password123')

  await mongoose.disconnect()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
