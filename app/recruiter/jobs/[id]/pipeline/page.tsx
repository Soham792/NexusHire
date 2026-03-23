'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Pipeline, PipelineApplication } from '@/components/kanban/Pipeline'
import { Loader2, ArrowLeft, Network, X, ChevronRight, Save, CheckCircle, XCircle, MinusCircle, Users, MoveRight } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { scoreColor, scoreBg } from '@/lib/utils'
import { CompatibilityRadar, deriveRadarValues } from '@/components/RadarChart'

const MEDAL = ['🥇', '🥈', '🥉']

export default function PipelinePage() {
  const { id: jobId } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const [selectedApp, setSelectedApp] = useState<PipelineApplication | null>(null)
  const [stageNote, setStageNote] = useState('')
  const [recruiterNotes, setRecruiterNotes] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [loadingExplain, setLoadingExplain] = useState(false)
  const [bulkSelected, setBulkSelected] = useState<string[]>([])
  const [bulkStage, setBulkStage] = useState('')
  const [bulkMoving, setBulkMoving] = useState(false)

  const { data: job } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => fetch(`/api/jobs/${jobId}`).then((r) => r.json()),
  })

  const { data: applicants, isLoading } = useQuery({
    queryKey: ['applicants', jobId],
    queryFn: () => fetch(`/api/jobs/${jobId}/applicants`).then((r) => r.json()),
  })

  const updateStage = useMutation({
    mutationFn: ({ appId, stage, note }: { appId: string; stage: string; note?: string }) =>
      fetch(`/api/applications/${appId}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage, note }),
      }).then((r) => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applicants', jobId] })
      toast.success('Stage updated')
    },
    onError: () => toast.error('Failed to update stage'),
  })

  const apps: PipelineApplication[] = Array.isArray(applicants) ? applicants : []

  // Rank by match score for medals
  const rankedIds = [...apps]
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3)
    .map((a) => a._id)

  async function handleStageChange(applicationId: string, newStage: string) {
    await updateStage.mutateAsync({ appId: applicationId, stage: newStage, note: stageNote })
  }

  async function handleBulkMove() {
    if (!bulkStage || bulkSelected.length === 0) return
    setBulkMoving(true)
    try {
      await Promise.all(bulkSelected.map((id) =>
        fetch(`/api/applications/${id}/stage`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stage: bulkStage }),
        })
      ))
      queryClient.invalidateQueries({ queryKey: ['applicants', jobId] })
      toast.success(`Moved ${bulkSelected.length} candidates to ${bulkStage.replace('_', ' ')}`)
      setBulkSelected([])
      setBulkStage('')
    } catch {
      toast.error('Bulk move failed')
    } finally {
      setBulkMoving(false)
    }
  }

  async function handleSaveNotes() {
    if (!selectedApp) return
    setSavingNotes(true)
    try {
      await fetch(`/api/applications/${selectedApp._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recruiterNotes }),
      })
      toast.success('Notes saved')
    } catch {
      toast.error('Failed to save notes')
    } finally {
      setSavingNotes(false)
    }
  }

  async function loadExplanation() {
    if (!selectedApp || explanation) return
    setLoadingExplain(true)
    try {
      const res = await fetch(`/api/ai/explain-match?applicationId=${selectedApp._id}`)
      const data = await res.json()
      setExplanation(data.explanation)
    } catch {
      toast.error('Failed to load explanation')
    } finally {
      setLoadingExplain(false)
    }
  }

  function openDrawer(app: PipelineApplication) {
    setSelectedApp(app)
    setRecruiterNotes((app as PipelineApplication & { recruiterNotes?: string }).recruiterNotes || '')
    setExplanation(null)
  }

  const radarValues = selectedApp
    ? deriveRadarValues({
        matchScore: { overall: selectedApp.matchScore, skillsMatch: (selectedApp as PipelineApplication & { matchScore: { skillsMatch?: number } }).matchScore?.skillsMatch ?? selectedApp.matchScore, experienceMatch: (selectedApp as PipelineApplication & { matchScore: { experienceMatch?: number } }).matchScore?.experienceMatch ?? selectedApp.matchScore },
        breakdown: (selectedApp as PipelineApplication & { breakdown?: Array<{ skill: string; match: string; type?: string }> }).breakdown,
        stage: selectedApp.stage,
      })
    : null

  const breakdown = selectedApp ? (selectedApp as PipelineApplication & { breakdown?: Array<{ skill: string; match: 'full' | 'partial' | 'none'; weight: number }> }).breakdown : undefined

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-full px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/recruiter/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-2 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <h1 className="text-2xl font-bold">Hiring Pipeline</h1>
            {job && <p className="text-muted-foreground mt-1">{job.title} · {apps.length} applicants</p>}
          </div>
          <Link
            href={`/recruiter/jobs/${jobId}/graph`}
            className="flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300 hover:bg-violet-500/20 transition-colors"
          >
            <Network className="h-4 w-4" />
            Graph view
          </Link>
        </div>

        {/* Top 3 medal banner */}
        {apps.length > 0 && (
          <div className="mb-6 flex gap-3">
            {[...apps].sort((a, b) => b.matchScore - a.matchScore).slice(0, 3).map((app, i) => (
              <button
                key={app._id}
                onClick={() => openDrawer(app)}
                className="flex items-center gap-2 glass rounded-xl px-4 py-2 text-sm hover:bg-white/8 transition-colors"
              >
                <span className="text-base">{MEDAL[i]}</span>
                <div className="text-left">
                  <p className="font-medium text-xs">{app.candidate?.name}</p>
                  <p className={`text-xs font-bold ${scoreColor(app.matchScore)}`}>{app.matchScore}%</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Bulk action bar */}
        {bulkSelected.length > 0 && (
          <div className="mb-4 flex items-center gap-3 glass rounded-xl px-4 py-3">
            <Users className="h-4 w-4 text-violet-400" />
            <span className="text-sm font-medium">{bulkSelected.length} selected</span>
            <div className="flex items-center gap-2 ml-auto">
              <select
                value={bulkStage}
                onChange={(e) => setBulkStage(e.target.value)}
                className="rounded-lg border border-white/10 bg-[hsl(0,0%,6%)] px-3 py-1.5 text-xs focus:outline-none"
              >
                <option value="">Move to stage…</option>
                {['applied', 'under_review', 'shortlisted', 'interview', 'decision', 'outcome'].map((s) => (
                  <option key={s} value={s}>{s.replace('_', ' ')}</option>
                ))}
              </select>
              <button
                onClick={handleBulkMove}
                disabled={!bulkStage || bulkMoving}
                className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition-colors"
              >
                {bulkMoving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <MoveRight className="h-3.5 w-3.5" />}
                Move
              </button>
              <button
                onClick={() => setBulkSelected([])}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-violet-500" /></div>
        ) : (
          <Pipeline
            applications={apps}
            onStageChange={handleStageChange}
            onCardClick={openDrawer}
            topRankedIds={rankedIds}
            selectedIds={bulkSelected}
            onSelectionChange={setBulkSelected}
          />
        )}
      </div>

      {/* Side drawer */}
      {selectedApp && (
        <div className="fixed inset-y-0 right-0 w-96 bg-[hsl(0,0%,6%)] border-l border-white/10 p-6 overflow-y-auto z-50 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold">Applicant Details</h2>
            <button onClick={() => setSelectedApp(null)} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Candidate info */}
          <div className="flex items-center gap-3 mb-6">
            {selectedApp.candidate?.image ? (
              <img src={selectedApp.candidate.image} alt="" className="h-12 w-12 rounded-full" />
            ) : (
              <div className="h-12 w-12 rounded-full bg-violet-600/30 flex items-center justify-center text-lg font-bold text-violet-400">
                {selectedApp.candidate?.name?.[0]?.toUpperCase() || '?'}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold">{selectedApp.candidate?.name}</p>
                {rankedIds.indexOf(selectedApp._id) >= 0 && (
                  <span className="text-base">{MEDAL[rankedIds.indexOf(selectedApp._id)]}</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{selectedApp.candidate?.email}</p>
              {selectedApp.candidate?.headline && (
                <p className="text-xs text-muted-foreground mt-0.5">{selectedApp.candidate.headline}</p>
              )}
            </div>
          </div>

          {/* Radar chart */}
          {radarValues && (
            <div className="mb-4 glass rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-2">Compatibility Radar</p>
              <div className="max-w-[200px] mx-auto">
                <CompatibilityRadar {...radarValues} />
              </div>
            </div>
          )}

          {/* Match score */}
          <div className="glass rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Match Score</span>
              <span className={`text-lg font-bold ${scoreColor(selectedApp.matchScore)}`}>
                {selectedApp.matchScore}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-purple-500"
                style={{ width: `${selectedApp.matchScore}%` }}
              />
            </div>
            {selectedApp.percentileRank !== undefined && (
              <p className="mt-1.5 text-xs text-muted-foreground">Top {100 - selectedApp.percentileRank}% of applicants</p>
            )}
          </div>

          {/* Per-skill checklist */}
          {breakdown && breakdown.length > 0 && (
            <div className="glass rounded-xl p-4 mb-4">
              <p className="text-xs text-muted-foreground mb-3">Skill Breakdown</p>
              <div className="space-y-2">
                {breakdown.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    {item.match === 'full' ? (
                      <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                    ) : item.match === 'partial' ? (
                      <MinusCircle className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />
                    )}
                    <span className={item.match === 'none' ? 'text-muted-foreground' : ''}>{item.skill}</span>
                    {item.weight === 3 && <span className="ml-auto text-muted-foreground text-xs">req</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI explanation */}
          <div className="mb-4">
            {explanation ? (
              <div className="glass rounded-xl p-3 text-xs text-muted-foreground leading-relaxed">
                <p className="text-violet-300 font-medium mb-1">Match Explanation</p>
                {explanation}
              </div>
            ) : (
              <button
                onClick={loadExplanation}
                disabled={loadingExplain}
                className="w-full flex items-center justify-center gap-1.5 glass rounded-xl px-3 py-2 text-xs text-violet-300 hover:bg-white/8 transition-colors disabled:opacity-50"
              >
                {loadingExplain ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                Load AI explanation
              </button>
            )}
          </div>

          {/* Stage selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Move to stage</label>
            <div className="space-y-2">
              {['applied', 'under_review', 'shortlisted', 'interview', 'decision', 'outcome'].map((s) => (
                <button
                  key={s}
                  onClick={async () => {
                    await handleStageChange(selectedApp._id, s)
                    setSelectedApp({ ...selectedApp, stage: s })
                  }}
                  className={`w-full flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                    selectedApp.stage === s
                      ? 'border-violet-500 bg-violet-500/15 text-violet-300'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="capitalize">{s.replace('_', ' ')}</span>
                  {selectedApp.stage === s && <ChevronRight className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Note for stage change */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1.5">Note (for stage change)</label>
            <textarea
              rows={2}
              value={stageNote}
              onChange={(e) => setStageNote(e.target.value)}
              placeholder="Optional note…"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all resize-none"
            />
          </div>

          {/* Recruiter private notes */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1.5">Private notes</label>
            <textarea
              rows={3}
              value={recruiterNotes}
              onChange={(e) => setRecruiterNotes(e.target.value)}
              placeholder="Private notes visible only to you…"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all resize-none"
            />
            <button
              onClick={handleSaveNotes}
              disabled={savingNotes}
              className="mt-2 flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              {savingNotes ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
              Save notes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
