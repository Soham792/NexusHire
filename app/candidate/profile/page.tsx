'use client'

import { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Navbar } from '@/components/Navbar'
import { toast } from 'sonner'
import { Loader2, Upload, Plus, X, Save, Sparkles } from 'lucide-react'

interface Skill { name: string; level: string }
interface Experience { title: string; company: string; startDate: string; endDate: string; description: string; current: boolean }
interface Education { degree: string; institution: string; field: string; year: number }

export default function CandidateProfilePage() {
  const queryClient = useQueryClient()
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const { data: profile, isLoading } = useQuery({
    queryKey: ['candidate-profile'],
    queryFn: () => fetch('/api/candidate/profile').then((r) => r.json()),
  })

  const [form, setForm] = useState({
    headline: '',
    bio: '',
    location: '',
    skills: [] as Skill[],
    experience: [] as Experience[],
    education: [] as Education[],
    github: '',
    linkedin: '',
    portfolio: '',
  })

  // Sync form with loaded profile (useEffect avoids state-during-render)
  useEffect(() => {
    if (!profile || isLoading) return
    setForm({
      headline: profile.headline || '',
      bio: profile.bio || '',
      location: profile.location || '',
      // Convert schema {skill, proficiency} → form {name, level}
      skills: (profile.skills || []).map((s: { skill?: string; name?: string; proficiency?: string; level?: string }) => ({
        name: s.skill || s.name || '',
        level: s.proficiency || s.level || 'intermediate',
      })),
      experience: profile.experience || [],
      education: profile.education || [],
      // Schema stores individual URL fields, not a nested socialLinks object
      github: profile.githubUrl || '',
      linkedin: profile.linkedinUrl || '',
      portfolio: profile.portfolioUrl || '',
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  const save = useMutation({
    mutationFn: () =>
      fetch('/api/candidate/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          socialLinks: { github: form.github, linkedin: form.linkedin, portfolio: form.portfolio },
        }),
      }).then((r) => r.json()),
    onSuccess: () => {
      toast.success('Profile saved!')
      queryClient.invalidateQueries({ queryKey: ['candidate-profile'] })
    },
    onError: () => toast.error('Failed to save profile'),
  })

  const [resumeTips, setResumeTips] = useState<string[]>([])

  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('resume', file)
    try {
      const res = await fetch('/api/candidate/resume', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success('Resume uploaded and parsed!')
      if (data.improvementTips?.length) setResumeTips(data.improvementTips)
      queryClient.invalidateQueries({ queryKey: ['candidate-profile'] })
    } catch {
      toast.error('Failed to upload resume')
    } finally {
      setUploading(false)
    }
  }

  function addSkill() {
    setForm({ ...form, skills: [...form.skills, { name: '', level: 'intermediate' }] })
  }
  function removeSkill(i: number) {
    setForm({ ...form, skills: form.skills.filter((_, idx) => idx !== i) })
  }

  function addExp() {
    setForm({
      ...form,
      experience: [...form.experience, { title: '', company: '', startDate: '', endDate: '', description: '', current: false }],
    })
  }
  function removeExp(i: number) {
    setForm({ ...form, experience: form.experience.filter((_, idx) => idx !== i) })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center py-40"><Loader2 className="h-8 w-8 animate-spin text-violet-500" /></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <button
            onClick={() => save.mutate()}
            disabled={save.isPending}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50 transition-colors"
          >
            {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save changes
          </button>
        </div>

        {/* Resume upload */}
        <div className="glass rounded-2xl p-6 mb-6 gradient-border">
          <h2 className="font-semibold mb-4">Resume</h2>
          <div className="flex items-center gap-4">
            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-violet-400 hover:text-violet-300">
                View current resume
              </a>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {uploading ? 'Uploading…' : 'Upload PDF'}
            </button>
            <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={handleResumeUpload} />
            <p className="text-xs text-muted-foreground">PDF only. AI will auto-fill your profile.</p>
          </div>
          {resumeTips.length > 0 && (
            <div className="mt-4 rounded-xl border border-violet-500/30 bg-violet-500/8 p-4">
              <div className="flex items-center gap-2 mb-2 text-violet-300 text-sm font-medium">
                <Sparkles className="h-4 w-4" /> AI Resume Tips
              </div>
              <ul className="space-y-1.5">
                {resumeTips.map((tip, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                    <span className="text-violet-400 shrink-0">{i + 1}.</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {profile?.resumeImprovementTips?.length > 0 && resumeTips.length === 0 && (
            <div className="mt-4 rounded-xl border border-violet-500/30 bg-violet-500/8 p-4">
              <div className="flex items-center gap-2 mb-2 text-violet-300 text-sm font-medium">
                <Sparkles className="h-4 w-4" /> AI Resume Tips
              </div>
              <ul className="space-y-1.5">
                {profile.resumeImprovementTips.map((tip: string, i: number) => (
                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                    <span className="text-violet-400 shrink-0">{i + 1}.</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Basic info */}
        <div className="glass rounded-2xl p-6 mb-6 gradient-border">
          <h2 className="font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Professional headline</label>
              <input
                value={form.headline}
                onChange={(e) => setForm({ ...form, headline: e.target.value })}
                placeholder="Senior React Developer · 5 years exp"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Bio</label>
              <textarea
                rows={3}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Tell employers about yourself…"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Location</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Mumbai, India"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'github' as const, label: 'GitHub URL' },
                { key: 'linkedin' as const, label: 'LinkedIn URL' },
                { key: 'portfolio' as const, label: 'Portfolio URL' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">{label}</label>
                  <input
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder="https://"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="glass rounded-2xl p-6 mb-6 gradient-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Skills</h2>
            <button onClick={addSkill} className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300">
              <Plus className="h-4 w-4" /> Add skill
            </button>
          </div>
          <div className="space-y-2">
            {form.skills.map((skill, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={skill.name}
                  onChange={(e) => {
                    const skills = [...form.skills]
                    skills[i] = { ...skills[i], name: e.target.value }
                    setForm({ ...form, skills })
                  }}
                  placeholder="e.g. React"
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all"
                />
                <select
                  value={skill.level}
                  onChange={(e) => {
                    const skills = [...form.skills]
                    skills[i] = { ...skills[i], level: e.target.value }
                    setForm({ ...form, skills })
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
                <button onClick={() => removeSkill(i)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {form.skills.length === 0 && (
              <p className="text-sm text-muted-foreground">No skills added yet. Click "Add skill" or upload your resume.</p>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="glass rounded-2xl p-6 mb-6 gradient-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Experience</h2>
            <button onClick={addExp} className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300">
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
          <div className="space-y-4">
            {form.experience.map((exp, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/3 p-4 relative">
                <button onClick={() => removeExp(i)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    value={exp.title}
                    onChange={(e) => {
                      const experience = [...form.experience]
                      experience[i] = { ...experience[i], title: e.target.value }
                      setForm({ ...form, experience })
                    }}
                    placeholder="Job title"
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all"
                  />
                  <input
                    value={exp.company}
                    onChange={(e) => {
                      const experience = [...form.experience]
                      experience[i] = { ...experience[i], company: e.target.value }
                      setForm({ ...form, experience })
                    }}
                    placeholder="Company"
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all"
                  />
                </div>
                <textarea
                  rows={2}
                  value={exp.description}
                  onChange={(e) => {
                    const experience = [...form.experience]
                    experience[i] = { ...experience[i], description: e.target.value }
                    setForm({ ...form, experience })
                  }}
                  placeholder="Describe your role and achievements…"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all resize-none"
                />
              </div>
            ))}
            {form.experience.length === 0 && (
              <p className="text-sm text-muted-foreground">No experience added.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
