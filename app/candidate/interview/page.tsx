'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Navbar } from '@/components/Navbar'
import { toast } from 'sonner'
import { Loader2, Send, Trophy, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { scoreColor, scoreBg } from '@/lib/utils'

interface Message {
  role: 'interviewer' | 'candidate'
  content: string
  score?: number
  feedback?: string
}

interface Report {
  overallScore: number
  strengths: string[]
  improvements: string[]
  recommendation: string
}

function InterviewContent() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId') || ''

  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [answer, setAnswer] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [report, setReport] = useState<Report | null>(null)

  const { data: job } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => fetch(`/api/jobs/${jobId}`).then((r) => r.json()),
    enabled: !!jobId,
  })

  const startInterview = useMutation({
    mutationFn: () =>
      fetch('/api/interview/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId }),
      }).then((r) => r.json()),
    onSuccess: (data) => {
      setSessionId(data.sessionId)
      setMessages([{ role: 'interviewer', content: data.question }])
    },
    onError: () => toast.error('Failed to start interview'),
  })

  const respond = useMutation({
    mutationFn: (ans: string) =>
      fetch('/api/interview/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, answer: ans }),
      }).then((r) => r.json()),
    onSuccess: (data) => {
      const updated = [...messages]
      const lastMsg = updated[updated.length - 1]
      if (lastMsg.role === 'candidate') {
        lastMsg.score = data.score
        lastMsg.feedback = data.feedback
      }

      if (data.isComplete) {
        setIsComplete(true)
        fetchReport()
      } else if (data.nextQuestion) {
        updated.push({ role: 'interviewer', content: data.nextQuestion })
      }
      setMessages(updated)
    },
    onError: () => toast.error('Failed to submit answer'),
  })

  async function fetchReport() {
    if (!sessionId) return
    try {
      const res = await fetch(`/api/interview/${sessionId}/report`)
      const data = await res.json()
      setReport(data)
    } catch {
      console.error('Failed to fetch report')
    }
  }

  function handleSend() {
    if (!answer.trim() || respond.isPending) return
    setMessages([...messages, { role: 'candidate', content: answer }])
    respond.mutate(answer)
    setAnswer('')
  }

  if (!jobId) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <p className="text-muted-foreground">Please select a job to start an interview.</p>
          <Link href="/candidate/applications" className="mt-4 inline-block text-violet-400 hover:text-violet-300 text-sm">
            ← Go to applications
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Link href="/candidate/applications" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to applications
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold">AI Interview Simulator</h1>
          {job && <p className="text-muted-foreground mt-1">{job.title} at {job.companyName}</p>}
        </div>

        {/* Report */}
        {report && (
          <div className="glass rounded-2xl p-6 mb-6 gradient-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <h2 className="font-semibold">Interview Complete!</h2>
                <p className="text-sm text-muted-foreground">Here&apos;s your performance report</p>
              </div>
              <span className={`ml-auto text-2xl font-bold ${scoreColor(report.overallScore)}`}>
                {report.overallScore}%
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-green-400 mb-2">Strengths</h3>
                <ul className="space-y-1">
                  {report.strengths?.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-green-500 shrink-0">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-orange-400 mb-2">Areas to improve</h3>
                <ul className="space-y-1">
                  {report.improvements?.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-orange-500 shrink-0">↗</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-violet-300 font-medium">{report.recommendation}</p>
            </div>
          </div>
        )}

        {/* Chat */}
        {sessionId ? (
          <div className="glass rounded-2xl overflow-hidden gradient-border">
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'candidate' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs rounded-2xl px-4 py-3 text-sm ${
                    m.role === 'interviewer'
                      ? 'bg-white/5 text-foreground rounded-tl-sm'
                      : 'bg-violet-600 text-white rounded-tr-sm'
                  }`}>
                    <p>{m.content}</p>
                    {m.role === 'candidate' && m.score !== undefined && (
                      <div className={`mt-2 text-xs font-medium ${scoreColor(m.score)}`}>
                        Score: {m.score}/10 · {m.feedback}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {respond.isPending && (
                <div className="flex justify-start">
                  <div className="bg-white/5 rounded-2xl px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-violet-400" />
                  </div>
                </div>
              )}
            </div>
            {!isComplete && (
              <div className="border-t border-white/10 p-4 flex gap-3">
                <textarea
                  rows={2}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                  placeholder="Type your answer… (Enter to send)"
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all resize-none"
                />
                <button
                  onClick={handleSend}
                  disabled={respond.isPending || !answer.trim()}
                  className="self-end rounded-xl bg-violet-600 p-2.5 text-white hover:bg-violet-700 disabled:opacity-50 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="glass rounded-2xl p-10 text-center gradient-border">
            <div className="mb-4 text-5xl">🎙️</div>
            <h2 className="text-lg font-semibold mb-2">Ready for your AI interview?</h2>
            <p className="text-sm text-muted-foreground mb-6">
              You&apos;ll be asked 5 role-specific questions. Each answer is scored in real time.
            </p>
            <button
              onClick={() => startInterview.mutate()}
              disabled={startInterview.isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50 transition-colors"
            >
              {startInterview.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Start interview
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function InterviewPage() {
  return (
    <Suspense>
      <InterviewContent />
    </Suspense>
  )
}
