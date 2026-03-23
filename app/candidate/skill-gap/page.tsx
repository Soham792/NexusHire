'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Navbar } from '@/components/Navbar'
import { Loader2, ArrowLeft, Target, BookOpen, Clock, CheckCircle, RefreshCw, Youtube, FileText, GraduationCap, Code, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface Resource { title: string; url: string; type: string }

const TYPE_META: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  video:    { icon: <Youtube className="h-3.5 w-3.5" />,       label: 'Video',    color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  article:  { icon: <FileText className="h-3.5 w-3.5" />,      label: 'Article',  color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  course:   { icon: <GraduationCap className="h-3.5 w-3.5" />, label: 'Course',   color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
  docs:     { icon: <BookOpen className="h-3.5 w-3.5" />,      label: 'Docs',     color: 'text-green-400 bg-green-500/10 border-green-500/20' },
  practice: { icon: <Code className="h-3.5 w-3.5" />,          label: 'Practice', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
}

function ResourceCard({ resource }: { resource: Resource }) {
  const meta = TYPE_META[resource.type] ?? TYPE_META.article
  const hasUrl = resource.url && resource.url.startsWith('http')
  return (
    <a
      href={hasUrl ? resource.url : undefined}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-colors ${meta.color} ${hasUrl ? 'hover:opacity-80 cursor-pointer' : 'cursor-default opacity-70'}`}
    >
      {meta.icon}
      <span className="flex-1 font-medium">{resource.title}</span>
      {hasUrl && <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />}
    </a>
  )
}

function SkillGapContent() {
  const searchParams = useSearchParams()
  const applicationId = searchParams.get('applicationId')
  const jobId = searchParams.get('jobId')
  const [regenerate, setRegenerate] = useState(false)

  const buildParams = (regen = regenerate) => {
    const p = new URLSearchParams()
    if (applicationId) p.set('applicationId', applicationId)
    if (jobId) p.set('jobId', jobId)
    if (regen) p.set('regenerate', 'true')
    return p.toString()
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['skill-gap', applicationId, jobId, regenerate],
    queryFn: () => fetch(`/api/ai/skill-gap?${buildParams()}`).then((r) => r.json()),
    enabled: !!(applicationId || jobId),
  })

  function handleRegenerate() {
    setRegenerate(true)
    setTimeout(() => refetch(), 50)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link
          href="/candidate/applications"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Skill Gap Analysis</h1>
            <p className="text-muted-foreground mt-1">AI-generated learning path to close your skill gap.</p>
          </div>
          {data && !isLoading && (
            <button
              onClick={handleRegenerate}
              disabled={isLoading}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted-foreground hover:bg-white/10 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Regenerate
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
            <p className="text-muted-foreground text-sm">Analyzing your profile against job requirements…</p>
            <p className="text-xs text-muted-foreground opacity-60">This may take 15–30 seconds</p>
          </div>
        ) : isError || data?.error ? (
          <div className="glass rounded-2xl p-8 text-center space-y-4">
            <p className="text-muted-foreground">Failed to generate analysis.</p>
            <button
              onClick={handleRegenerate}
              className="flex items-center gap-2 mx-auto rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" /> Try again
            </button>
          </div>
        ) : data?.allSkillsMatched ? (
          <div className="glass rounded-2xl p-10 text-center gradient-border">
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">You&apos;re fully qualified!</h2>
            <p className="text-muted-foreground text-sm">
              Your profile matches all {data.requiredCount || 'required'} skills for this role.
              No skill gap to close.
            </p>
            <Link
              href="/candidate/applications"
              className="inline-flex mt-6 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
            >
              Back to applications
            </Link>
          </div>
        ) : data?.missingSkills?.length > 0 ? (
          <div className="space-y-6">
            {/* Missing skills */}
            <div className="glass rounded-2xl p-6 gradient-border">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-violet-400" />
                <h2 className="font-semibold">Skills to Acquire ({data.missingSkills.length})</h2>
              </div>
              <div className="space-y-3">
                {data.missingSkills.map((skill: { skill: string; priority: string; resources: Resource[]; weeklyPlan?: string[] }, i: number) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/3 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-sm">{skill.skill}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        skill.priority === 'high' ? 'bg-red-500/15 text-red-400' :
                        skill.priority === 'medium' ? 'bg-yellow-500/15 text-yellow-400' :
                        'bg-green-500/15 text-green-400'
                      }`}>
                        {skill.priority} priority
                      </span>
                    </div>
                    {skill.resources?.length > 0 && (
                      <div className="space-y-1.5">
                        <p className="text-xs text-muted-foreground mb-1.5">Learning resources:</p>
                        {skill.resources.map((r, ri) => (
                          <ResourceCard key={ri} resource={typeof r === 'string' ? { title: r, url: '', type: 'article' } : r} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            {data.timeline && (
              <div className="glass rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-violet-400" />
                  <h2 className="font-semibold">Learning Timeline</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Estimated time to close your skill gap: <strong className="text-foreground">{data.timeline}</strong>
                </p>

                {data.steps?.length > 0 && (
                  <div className="space-y-3">
                    {data.steps.map((step: { week: number; focus: string; tasks: string[] }, i: number) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="h-7 w-7 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-xs font-bold text-violet-400 shrink-0">
                            {step.week}
                          </div>
                          {i < data.steps.length - 1 && (
                            <div className="flex-1 w-px bg-white/10 my-1" />
                          )}
                        </div>
                        <div className="pb-3">
                          <p className="font-medium text-sm">Week {step.week}: {step.focus}</p>
                          <ul className="mt-1 space-y-0.5">
                            {step.tasks?.map((task: string, ti: number) => (
                              <li key={ti} className="text-xs text-muted-foreground flex gap-1.5">
                                <span className="text-violet-500 shrink-0">•</span>
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Fallback: data loaded but empty — force regenerate */
          <div className="glass rounded-2xl p-10 text-center space-y-4">
            <p className="text-muted-foreground">No analysis available yet.</p>
            <button
              onClick={handleRegenerate}
              disabled={isLoading}
              className="flex items-center gap-2 mx-auto rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Generate analysis
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SkillGapPage() {
  return (
    <Suspense>
      <SkillGapContent />
    </Suspense>
  )
}
