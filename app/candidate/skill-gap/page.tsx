'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Navbar } from '@/components/Navbar'
import { Loader2, ArrowLeft, Target, BookOpen, Clock } from 'lucide-react'
import Link from 'next/link'

function SkillGapContent() {
  const searchParams = useSearchParams()
  const applicationId = searchParams.get('applicationId')
  const jobId = searchParams.get('jobId')

  const params = new URLSearchParams()
  if (applicationId) params.set('applicationId', applicationId)
  if (jobId) params.set('jobId', jobId)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['skill-gap', applicationId, jobId],
    queryFn: () => fetch(`/api/ai/skill-gap?${params}`).then((r) => r.json()),
    enabled: !!(applicationId || jobId),
  })

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/candidate/applications" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold">Skill Gap Analysis</h1>
          <p className="text-muted-foreground mt-1">AI-generated learning path to close your skill gap.</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20 gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
            <span className="text-muted-foreground text-sm">Analyzing your profile…</span>
          </div>
        ) : isError || data?.error ? (
          <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
            Failed to generate analysis. Please try again.
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* Missing skills */}
            {data.missingSkills?.length > 0 && (
              <div className="glass rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-violet-400" />
                  <h2 className="font-semibold">Skills to Acquire</h2>
                </div>
                <div className="space-y-3">
                  {data.missingSkills.map((skill: { skill: string; priority: string; resources: string[] }, i: number) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/3 p-4">
                      <div className="flex items-center justify-between mb-2">
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
                        <div className="flex flex-wrap gap-1.5">
                          {skill.resources.map((r, ri) => (
                            <span key={ri} className="flex items-center gap-1 text-xs text-muted-foreground">
                              <BookOpen className="h-3 w-3" /> {r}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            {data.timeline && (
              <div className="glass rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-violet-400" />
                  <h2 className="font-semibold">Learning Timeline</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{data.timeline}</p>

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
        ) : null}
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
