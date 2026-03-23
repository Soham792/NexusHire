import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISkill {
  skill: string
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  yearsOfExp?: number
}

export interface IExperience {
  title: string
  company: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
}

export interface IEducation {
  degree: string
  institution: string
  year: string
  field?: string
}

export interface IProject {
  name: string
  description: string
  techStack: string[]
  url?: string
}

export interface ICandidateProfile extends Document {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  headline: string
  bio?: string
  location: string
  githubUrl?: string
  portfolioUrl?: string
  linkedinUrl?: string
  skills: ISkill[]
  experience: IExperience[]
  education: IEducation[]
  projects: IProject[]
  resumeS3Key?: string
  resumeText?: string
  embedding: number[]
  profileStrength: number
  resumeImprovementTips: string[]
  recentInteractionSkills: string[]
  createdAt: Date
  updatedAt: Date
}

const CandidateProfileSchema = new Schema<ICandidateProfile>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  headline: { type: String, default: '' },
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  githubUrl: String,
  portfolioUrl: String,
  linkedinUrl: String,
  skills: [{
    skill: String,
    proficiency: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] },
    yearsOfExp: Number,
  }],
  experience: [{
    title: String, company: String, startDate: String, endDate: String,
    current: Boolean, description: String,
  }],
  education: [{ degree: String, institution: String, year: String, field: String }],
  projects: [{ name: String, description: String, techStack: [String], url: String }],
  resumeS3Key: String,
  resumeText: String,
  embedding: { type: [Number], default: [] },
  profileStrength: { type: Number, default: 0 },
  resumeImprovementTips: [String],
  recentInteractionSkills: { type: [String], default: [] },
}, { timestamps: true })

CandidateProfileSchema.index({ embedding: '2dsphere' })

export const CandidateProfileModel: Model<ICandidateProfile> =
  mongoose.models.CandidateProfile ??
  mongoose.model<ICandidateProfile>('CandidateProfile', CandidateProfileSchema)

export default CandidateProfileModel
