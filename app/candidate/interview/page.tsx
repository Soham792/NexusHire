'use client'

import { Suspense, useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Job {
  _id: string
  title: string
  companyName: string
  roleLevel?: string
  requiredSkills?: Array<{ skill: string; weight?: number }>
  description?: string
}

interface TranscriptEntry { question: string; answer: string }

interface FeedbackData {
  overallScore: number
  categoryScores: Record<string, number>
  perQuestionFeedback: Array<{
    questionIndex: number; question: string; score: number
    quality: string; feedback: string; idealAnswer: string
  }>
  strengths: string[]
  improvements: string[]
  overallAssessment: string
  learningResources: Array<{ skill: string; resources: Array<{ title: string; url: string; type: string }> }>
  trendingTechnologies: Array<{ name: string; reason: string; resource: { title: string; url: string; type: string } }>
  violations?: { tab: number; fs: number; face: number }
  autoSubmitted?: boolean
}

// ─── STAGE ────────────────────────────────────────────────────────────────────
const STAGE = {
  SETUP: 'setup', SPEAKING: 'speaking', LISTENING: 'listening',
  BETWEEN: 'between', PROCESSING: 'processing', REPORT: 'report',
} as const
type Stage = typeof STAGE[keyof typeof STAGE]

const SCORE_CATS = [
  { key: 'communicationSkills', label: 'Communication', icon: '💬' },
  { key: 'technicalKnowledge',  label: 'Technical',     icon: '⚙️' },
  { key: 'problemSolving',      label: 'Problem Solving', icon: '🧩' },
  { key: 'culturalRoleFit',     label: 'Culture Fit',   icon: '🤝' },
  { key: 'confidenceClarity',   label: 'Confidence',    icon: '🎯' },
]

// ─── GROQ PROXIES ─────────────────────────────────────────────────────────────
async function callGroq(prompt: string): Promise<string> {
  const res = await fetch('/api/interview/groq-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.text || ''
}

async function callGroqWhisper(audioBlob: Blob): Promise<string> {
  const form = new FormData()
  form.append('file', audioBlob, 'recording.webm')
  const res = await fetch('/api/interview/groq-whisper', { method: 'POST', body: form })
  if (!res.ok) throw new Error('Whisper failed')
  const data = await res.json()
  return data.text || ''
}

// ─── PROMPTS ──────────────────────────────────────────────────────────────────
function parseSkills(jd: string, fallback: Array<{ skill: string } | string> = []) {
  if (jd?.trim()) {
    const lines = jd.split('\n')
    const skillLines: string[] = []
    let inSection = false
    for (const line of lines) {
      if (/skills|technologies|tech stack|requirements|qualifications|tools|languages|frameworks/i.test(line)) inSection = true
      if (inSection && line.trim()) skillLines.push(line)
      if (inSection && skillLines.length > 10) break
    }
    const source = skillLines.length > 1 ? skillLines.join(', ') : jd
    const tokens = source.replace(/[•\-–—*]/g, ',').split(/[,;\n]+/)
      .map(t => t.replace(/[^a-zA-Z0-9.#+\s]/g, '').trim()).filter(t => t.length >= 2 && t.length <= 40)
    const unique = Array.from(new Set(tokens))
    if (unique.length >= 1) return unique
  }
  return fallback.map(s => (typeof s === 'string' ? s : s.skill))
}

function promptQuestions({ job, resumeText, jd }: { job: Job; resumeText: string; jd: string }) {
  const skills = parseSkills(jd, job.requiredSkills || [])
  const seed = Math.floor(Math.random() * 99999)
  return `You are an expert technical interviewer. Seed: ${seed}.
Job: ${job.title} at ${job.companyName} (${job.roleLevel || 'mid-level'})
REQUIRED SKILLS:
${skills.map((s, i) => `${i + 1}. ${s}`).join('\n')}
CRITICAL: Ask ONLY about skills listed above.
${jd ? `\nJob Description:\n${jd.trim()}\n` : ''}
${resumeText ? `\nCandidate Resume:\n${resumeText.trim()}\n` : ''}
Generate exactly 5 unique interview questions. Mix: 3 deep technical, 1 scenario, 1 experience-mapping.
Rules: voice-friendly, no markdown, 1-2 sentences max, do NOT number them.
Return ONLY a JSON array of strings. Example: ["Question one", "Question two"]`
}

function promptFeedback({ job, transcript, jd }: { job: Job; transcript: TranscriptEntry[]; jd: string }) {
  const skills = parseSkills(jd, job.requiredSkills || [])
  const tagged = transcript.map((t, i) => {
    const empty = !t.answer?.trim() || t.answer.trim() === '(skipped)'
    const wordCount = empty ? 0 : t.answer.trim().split(/\s+/).length
    const short = !empty && wordCount < 8
    return { i: i + 1, q: t.question, a: t.answer || '(no answer)', empty, short, wordCount }
  })
  const formatted = tagged.map(t =>
    `Q${t.i}: ${t.q}\nA${t.i}: ${t.empty ? '⚠️ NO ANSWER — must score 0' : `"${t.a}" [${t.wordCount} words]`}${t.short ? ' ← very short, likely vague' : ''}`
  ).join('\n\n')
  const empties = tagged.filter(t => t.empty).length
  return `You are a STRICT, realistic technical interviewer evaluating a candidate for: ${job.title} at ${job.companyName}.

IMPORTANT: Base every score ONLY on what the candidate ACTUALLY SAID. Do not give benefit of the doubt.

SCORING RUBRIC:
- No answer / skipped = 0
- Filler words, under 8 words, no substance = 0–15
- Vague answer without specifics = 15–30
- Partially correct, missing key concepts = 30–55
- Correct with reasonable detail = 55–75
- Strong, specific, demonstrates real experience = 75–90
- Exceptional, covers edge cases, examples = 90–100

${empties >= 3 ? 'RULE: overallScore MUST be ≤ 20 (3+ unanswered).' : empties >= 2 ? 'RULE: overallScore MUST be ≤ 35 (2+ unanswered).' : ''}

TRANSCRIPT:
${formatted}

For learningResources: only for skills with score < 55. Skills domain: ${skills.join(', ')}. Provide 2 REAL URLs.

Return ONLY valid JSON (no markdown, no fences):
{"overallScore":0-100,"categoryScores":{"communicationSkills":0-100,"technicalKnowledge":0-100,"problemSolving":0-100,"culturalRoleFit":0-100,"confidenceClarity":0-100},"perQuestionFeedback":[{"questionIndex":0,"question":"...","score":0-100,"quality":"correct|partial|incorrect|not_answered","feedback":"2-3 sentences","idealAnswer":"2-3 sentences"}],"strengths":["..."],"improvements":["..."],"overallAssessment":"2-3 sentences","learningResources":[{"skill":"...","resources":[{"title":"...","url":"real URL","type":"video|article|course|docs"}]}],"trendingTechnologies":[{"name":"...","reason":"...","resource":{"title":"...","url":"real URL","type":"video|article|course|docs"}}]}`
}

// ─── LOAD PUTER.JS (once, lazily) ─────────────────────────────────────────────
function loadPuter(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') { resolve(); return }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).puter) { resolve(); return }
    if (document.querySelector('script[data-puter]')) {
      // Already injected but not loaded yet — poll
      const iv = setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).puter) { clearInterval(iv); resolve() }
      }, 100)
      return
    }
    const s = document.createElement('script')
    s.src = 'https://js.puter.com/v2/'
    s.dataset.puter = '1'
    s.onload = () => resolve()
    s.onerror = () => resolve()   // non-fatal — browser TTS fallback kicks in
    document.head.appendChild(s)
  })
}

// ─── SPEECH HOOK ──────────────────────────────────────────────────────────────
function useSpeech() {
  const audioRef      = useRef<HTMLAudioElement | null>(null)
  const speakIdRef    = useRef(0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef        = useRef<any>(null)
  const listenRef     = useRef(false)
  const mrRef         = useRef<MediaRecorder | null>(null)
  const chunksRef     = useRef<Blob[]>([])
  const micStreamRef  = useRef<MediaStream | null>(null)

  const [sttMode, setSttMode] = useState<'webspeech' | 'whisper'>('webspeech')

  // Load Puter.js once on mount
  useEffect(() => { loadPuter() }, [])

  const unlockAudio = useCallback(() => {
    // Puter.js handles its own audio — just ensure a silent AudioContext is running
    // so browsers don't block the first Audio() play on iOS/Safari
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const buf = ctx.createBuffer(1, 1, 22050)
      const src = ctx.createBufferSource()
      src.buffer = buf; src.connect(ctx.destination); src.start(0)
    } catch (_) {}
  }, [])

  // ── Browser TTS fallback (used when Puter.js is unavailable) ────────────
  const browserSpeak = useCallback((text: string, onDone?: () => void) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) { onDone?.(); return }
    try { window.speechSynthesis.cancel() } catch (_) {}

    let finished = false
    const finish = () => { if (finished) return; finished = true; setTimeout(() => onDone?.(), 300) }

    const wordCount = text.trim().split(/\s+/).length
    const failsafe = setTimeout(finish, Math.max(5000, wordCount * 450 + 1500))

    const utt = new SpeechSynthesisUtterance(text)
    utt.rate = 0.95; utt.pitch = 1
    utt.onend  = () => { clearTimeout(failsafe); finish() }
    utt.onerror = () => { clearTimeout(failsafe); finish() }
    setTimeout(() => {
      try { window.speechSynthesis.speak(utt) }
      catch (_) { clearTimeout(failsafe); finish() }
    }, 80)
  }, [])

  // ── Primary TTS: Puter.js (free, unlimited, no key) ─────────────────────
  const speak = useCallback(async (text: string, onDone?: () => void) => {
    const myId = ++speakIdRef.current
    const mine = () => speakIdRef.current === myId
    if (audioRef.current) { try { audioRef.current.pause() } catch (_) {} audioRef.current = null }

    try {
      await loadPuter()   // no-op if already loaded
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const puter = (window as any).puter
      if (!puter?.ai?.txt2speech) throw new Error('puter.ai.txt2speech not available')

      const audio: HTMLAudioElement = await puter.ai.txt2speech(text)
      if (!mine()) return

      audioRef.current = audio
      let done = false
      const finish = () => {
        if (!mine() || done) return
        done = true; audioRef.current = null; setTimeout(() => onDone?.(), 300)
      }
      // Failsafe in case onended never fires
      const wordCount = text.trim().split(/\s+/).length
      const failsafe = setTimeout(finish, Math.max(6000, wordCount * 500 + 2000))
      audio.onended = () => { clearTimeout(failsafe); finish() }
      audio.onerror = () => { clearTimeout(failsafe); finish() }
      await audio.play()
    } catch (e) {
      console.warn('[Puter TTS failed, using browser TTS]', (e as Error).message)
      if (mine()) browserSpeak(text, onDone)
    }
  }, [browserSpeak])

  const stopSpeaking = useCallback(() => {
    speakIdRef.current++
    if (audioRef.current) { try { audioRef.current.pause() } catch (_) {} audioRef.current = null }
    try { window.speechSynthesis?.cancel() } catch (_) {}
  }, [])

  const stopListening = useCallback(() => {
    listenRef.current = false
    try { recRef.current?.abort() } catch (_) {}
    try { mrRef.current?.stop() } catch (_) {}
    recRef.current = null; mrRef.current = null
  }, [])

  const startWebSpeech = useCallback((
    onResult: (text: string) => void,
    onError: (e: { error: string }) => void,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition
    if (!SR) { onError({ error: 'not-supported' }); return false }
    let acc = ''; let gen = 0
    listenRef.current = true

    function boot(myGen: number, attempt: number) {
      if (!listenRef.current || myGen !== gen) return
      const rec = new SR()
      rec.continuous = true
      rec.interimResults = true
      rec.lang = 'en-IN'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rec.onresult = (e: any) => {
        const latest = e.results[e.results.length - 1]
        const t = latest[0].transcript
        if (latest.isFinal) {
          acc += (acc ? ' ' : '') + t
          onResult(acc)
        } else {
          onResult(acc + (acc ? ' ' : '') + t)
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rec.onerror = (e: any) => {
        console.warn('[WebSpeech error]', e.error)
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') onError({ error: e.error })
        // network/no-speech errors are transient — let onend restart
      }
      rec.onend = () => {
        if (!listenRef.current || myGen !== gen) return
        gen++; setTimeout(() => boot(gen, 0), 150)
      }
      recRef.current = rec
      try { rec.start(); console.log('[WebSpeech] started, lang=en-IN') }
      catch (e) {
        console.warn('[WebSpeech start failed]', e)
        if (attempt < 3) setTimeout(() => boot(myGen, attempt + 1), 500)
        else onError({ error: 'start-failed' })
      }
    }
    boot(gen, 0)
    return true
  }, [])

  const startWhisper = useCallback((
    onResult: (text: string) => void,
    onError: (e: { error: string }) => void,
    stream: MediaStream | null,
  ) => {
    if (!stream) { onError({ error: 'no-stream' }); return }
    chunksRef.current = []
    const mr = new MediaRecorder(stream, { mimeType: 'audio/webm' })
    mrRef.current = mr
    listenRef.current = true
    mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
    mr.onerror = () => onError({ error: 'recorder-error' })
    mr.start(250)
  }, [])

  const finishWhisper = useCallback(async (onResult: (text: string) => void) => {
    if (!mrRef.current) return
    try { mrRef.current.stop() } catch (_) {}
    await new Promise(r => setTimeout(r, 350))
    const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
    if (blob.size < 1000) { onResult(''); return }
    try { const text = await callGroqWhisper(blob); onResult(text) }
    catch (e) { console.warn('[Whisper]', e); onResult('') }
  }, [])

  // Acquire mic on-demand for Whisper (called only when Web Speech API fails)
  const getMicStream = useCallback(async (): Promise<MediaStream | null> => {
    if (micStreamRef.current?.active) return micStreamRef.current
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      micStreamRef.current = s
      return s
    } catch (e) { console.warn('[Mic getUserMedia]', e); return null }
  }, [])

  const listen = useCallback((
    onResult: (text: string) => void,
    onError: (e: { error: string }) => void,
  ) => {
    const fallbackToWhisper = async () => {
      console.warn('[STT] WebSpeech blocked — switching to Whisper mode')
      setSttMode('whisper')
      const stream = await getMicStream()
      if (stream) startWhisper(onResult, onError, stream)
      else onError({ error: 'mic-denied' })
    }

    const ok = startWebSpeech(onResult, (err) => {
      if (err.error === 'not-allowed' || err.error === 'service-not-allowed' || err.error === 'start-failed') {
        fallbackToWhisper()
      }
    })
    if (!ok) fallbackToWhisper()
  }, [startWebSpeech, startWhisper, getMicStream])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = typeof window !== 'undefined' ? (window as any) : null
  const supported = !!(w?.SpeechRecognition || w?.webkitSpeechRecognition || w?.MediaRecorder)

  return { supported, sttMode, speak, stopSpeaking, listen, stopListening, finishWhisper, unlockAudio, micStreamRef }
}

// ─── YOLO PERSON DETECTION ────────────────────────────────────────────────────
const TFJS_CDN = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js'
const COCO_CDN = 'https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js'

async function loadYOLO() {
  const load = (src: string) => new Promise<void>((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) return res()
    const s = document.createElement('script')
    s.src = src; s.onload = () => res(); s.onerror = () => rej(new Error('Script failed: ' + src))
    document.head.appendChild(s)
  })
  await load(TFJS_CDN); await load(COCO_CDN)
}

function usePersonDetection({ videoRef, active, onViolation }: {
  videoRef: React.RefObject<HTMLVideoElement | null>
  active: boolean
  onViolation: (msg: string) => void
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modelRef  = useRef<any>(null)
  const readyRef  = useRef(false)
  const loadedRef = useRef(false)
  const coolRef   = useRef(false)
  const badRef    = useRef(0)
  const intRef    = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (loadedRef.current) return
    loadedRef.current = true
    ;(async () => {
      try {
        await loadYOLO()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(window as any).cocoSsd) throw new Error('cocoSsd not found')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        modelRef.current = await (window as any).cocoSsd.load({ base: 'mobilenet_v2' })
        readyRef.current = true
      } catch (e) { console.warn('[YOLO] disabled:', (e as Error).message) }
    })()
  }, [])

  useEffect(() => {
    if (!active) { if (intRef.current) clearInterval(intRef.current); badRef.current = 0; return }
    intRef.current = setInterval(async () => {
      if (!readyRef.current) return
      const v = videoRef.current
      if (!v || v.readyState < 2 || v.videoWidth === 0) return
      try {
        const preds = await modelRef.current.detect(v)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const n = preds.filter((p: any) => p.class === 'person' && p.score > 0.45).length
        if (n === 1) { badRef.current = 0; return }
        if (++badRef.current < 4) return
        if (coolRef.current) return
        coolRef.current = true; badRef.current = 0
        onViolation(n === 0 ? 'Stay visible in the camera frame' : 'Multiple people detected')
        setTimeout(() => { coolRef.current = false }, 20000)
      } catch (_) {}
    }, 2000)
    return () => { if (intRef.current) clearInterval(intRef.current) }
  }, [active, videoRef, onViolation])
}

// ─── SMALL UI COMPONENTS ──────────────────────────────────────────────────────
function Bars({ active, color = '#818cf8' }: { active: boolean; color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2.5, height: 22 }}>
      {[3, 5, 8, 11, 8, 5, 3, 5, 8].map((h, i) => (
        <div key={i} style={{
          width: 3, borderRadius: 2, background: color,
          height: active ? h * 2 + 2 : 3, transition: 'height .1s',
          animation: active ? `barAnim ${0.33 + i * 0.07}s ease-in-out infinite alternate` : 'none',
        }} />
      ))}
      <style>{`@keyframes barAnim{from{transform:scaleY(.35)}to{transform:scaleY(1.4)}}`}</style>
    </div>
  )
}

function ScoreRing({ pct, size = 112, stroke = 9, color }: { pct: number; size?: number; stroke?: number; color: string }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 1.2s ease' }} />
    </svg>
  )
}

function ScoreLine({ label, icon, score }: { label: string; icon: string; score: number }) {
  const c = score >= 75 ? '#34d399' : score >= 50 ? '#fbbf24' : '#f87171'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 11 }}>
      <span style={{ fontSize: 15, width: 22 }}>{icon}</span>
      <span style={{ flex: 1, fontSize: 13, color: '#94a3b8' }}>{label}</span>
      <div style={{ width: 90, height: 4, borderRadius: 2, background: 'rgba(255,255,255,.06)', overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', background: c, borderRadius: 2, transition: 'width 1.1s ease' }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: c, minWidth: 30, textAlign: 'right' }}>{score}</span>
    </div>
  )
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const G = {
  page:       { minHeight: '100vh', background: '#080810', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#e2e8f0' },
  card:       { background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '1.5rem', marginBottom: '1rem' },
  input:      { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.05)', color: '#e2e8f0', fontSize: 13, fontFamily: 'inherit', outline: 'none', resize: 'vertical' as const, lineHeight: 1.5, boxSizing: 'border-box' as const },
  label:      { fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase' as const, letterSpacing: '.07em', marginBottom: 7, display: 'block' },
  btnPrimary: { width: '100%', padding: '13px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
  btnGhost:   { padding: '9px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.04)', color: '#94a3b8', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' },
}

// ─── VOICE INTERVIEW COMPONENT ────────────────────────────────────────────────
function VoiceInterview({ job, initialResumeText }: { job: Job; initialResumeText: string }) {
  const { supported, sttMode, speak, stopSpeaking, listen, stopListening, finishWhisper, unlockAudio, micStreamRef } = useSpeech()

  const [stage, setStage]           = useState<Stage>(STAGE.SETUP)
  const [questions, setQuestions]   = useState<string[]>([])
  const questionsRef                = useRef<string[]>([])   // always-fresh — avoids stale closure
  const [qIdx, setQIdx]             = useState(0)
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const transcriptRef               = useRef<TranscriptEntry[]>([])
  const [liveText, setLiveText]     = useState('')
  const [feedback, setFeedback]     = useState<FeedbackData | null>(null)
  const [error, setError]           = useState<string | null>(null)
  const [loading, setLoading]       = useState(false)
  const [muted, setMuted]           = useState(false)
  const [elapsed, setElapsed]       = useState(0)

  const [resumeText, setResumeText] = useState(initialResumeText)
  const [jd, setJd]                 = useState(job.description || '')
  const jdRef     = useRef(job.description || '')
  const resumeRef = useRef(initialResumeText)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const [camStatus, setCamStatus]   = useState<'pending' | 'granted' | 'denied'>('pending')
  const [camStream, setCamStream]   = useState<MediaStream | null>(null)
  const [violations, setViolations] = useState({ tab: 0, fs: 0, face: 0 })
  const [warning, setWarning]       = useState<string | null>(null)
  const violRef    = useRef({ tab: 0, fs: 0, face: 0 })
  const activeRef  = useRef(false)
  const autoSubRef = useRef(false)
  const accRef     = useRef('')
  const faceVidRef = useRef<HTMLVideoElement | null>(null)
  const bgVidRef   = useRef<HTMLVideoElement | null>(null)
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const finishRef  = useRef<(() => void) | null>(null)

  const setJdSynced      = (v: string) => { setJd(v);        jdRef.current = v }
  const setResumeSynced  = (v: string) => { setResumeText(v); resumeRef.current = v }

  // keep transcriptRef fresh
  useEffect(() => { transcriptRef.current = transcript }, [transcript])

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const on = [STAGE.SPEAKING, STAGE.LISTENING, STAGE.BETWEEN].includes(stage as never)
    if (on) timerRef.current = setInterval(() => setElapsed(t => t + 1), 1000)
    else if (timerRef.current) clearInterval(timerRef.current)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [stage])
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  // ── Security ──────────────────────────────────────────────────────────────
  useEffect(() => { activeRef.current = [STAGE.SPEAKING, STAGE.LISTENING, STAGE.BETWEEN].includes(stage as never) }, [stage])

  const addViolation = useCallback((type: 'tab' | 'fs' | 'face') => {
    if (!activeRef.current || autoSubRef.current) return
    const v = { ...violRef.current, [type]: violRef.current[type] + 1 }
    violRef.current = v; setViolations({ ...v })
    const total = v.tab + v.fs + v.face
    if (total >= 3) {
      autoSubRef.current = true
      setWarning('🚫 Max violations reached — auto-submitting')
      stopListening(); stopSpeaking()
      setTimeout(() => finishRef.current?.(), 1500)
    } else {
      const left = 3 - total
      const msgs = { tab: '⚠️ Tab switching detected', fs: '⚠️ Fullscreen exited', face: '⚠️ Camera issue' }
      setWarning(`${msgs[type]} — ${left} warning${left !== 1 ? 's' : ''} left`)
      setTimeout(() => setWarning(null), 4000)
    }
  }, [stopListening, stopSpeaking])

  useEffect(() => {
    const onVis = () => { if (document.hidden) addViolation('tab') }
    const onFs  = () => { if (!document.fullscreenElement) addViolation('fs') }
    document.addEventListener('visibilitychange', onVis)
    document.addEventListener('fullscreenchange', onFs)
    return () => { document.removeEventListener('visibilitychange', onVis); document.removeEventListener('fullscreenchange', onFs) }
  }, [addViolation])

  // ── YOLO ──────────────────────────────────────────────────────────────────
  const yoloActive  = [STAGE.SPEAKING, STAGE.LISTENING, STAGE.BETWEEN].includes(stage as never)
  const onFaceViol  = useCallback(() => addViolation('face'), [addViolation])
  usePersonDetection({ videoRef: faceVidRef, active: yoloActive, onViolation: onFaceViol })

  const faceVidCb = useCallback((node: HTMLVideoElement | null) => {
    faceVidRef.current = node
    if (node && camStream && node.srcObject !== camStream) node.srcObject = camStream
  }, [camStream])
  const bgVidCb = useCallback((node: HTMLVideoElement | null) => {
    bgVidRef.current = node
    if (node && camStream && node.srcObject !== camStream) node.srcObject = camStream
  }, [camStream])

  // ── Camera ────────────────────────────────────────────────────────────────
  const requestCam = useCallback(async () => {
    try {
      // Camera only — do NOT pre-acquire the mic here.
      // Web Speech API needs exclusive mic access; holding a getUserMedia audio stream
      // blocks it in Chrome. Mic is acquired on-demand only if Whisper fallback is needed.
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      setCamStream(stream)
      setCamStatus('granted')
      return true
    } catch (e) {
      setCamStatus('denied')
      setError('Camera access required. Please allow camera access, then retry.')
      return false
    }
  }, [])

  useEffect(() => {
    if (stage === STAGE.SETUP && camStream) {
      camStream.getTracks().forEach(t => t.stop())
      setCamStream(null); setCamStatus('pending')
      micStreamRef.current?.getTracks().forEach(t => t.stop())
      micStreamRef.current = null
    }
  }, [stage]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => { camStream?.getTracks().forEach(t => t.stop()) }, [camStream])

  // ── THE CORE: start mic when stage = LISTENING ─────────────────────────────
  useEffect(() => {
    if (stage !== STAGE.LISTENING) return
    setLiveText(''); accRef.current = ''
    let silenceTimer: ReturnType<typeof setTimeout> | null = null

    const resetSilenceTimer = (hasText: boolean) => {
      if (silenceTimer) clearTimeout(silenceTimer)
      if (!hasText) return
      silenceTimer = setTimeout(() => {
        if (accRef.current.trim().split(/\s+/).length >= 3) setStage(STAGE.BETWEEN)
      }, 12000)
    }

    const t = setTimeout(() => {
      listen(
        (text) => { accRef.current = text; setLiveText(text); resetSilenceTimer(!!text.trim()) },
        (err)  => {
          console.warn('[STT]', err.error)
          if (err.error === 'not-allowed' || err.error === 'service-not-allowed') {
            setError('Microphone permission denied. Please allow mic access in your browser and retry.')
          }
        },
      )
    }, 300)
    return () => { clearTimeout(t); if (silenceTimer) clearTimeout(silenceTimer); stopListening() }
  }, [stage]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Speak question ────────────────────────────────────────────────────────
  // Uses questionsRef (not questions state) to avoid stale closures in startInterview's setTimeout
  const speakQ = useCallback((idx: number) => {
    const text = questionsRef.current[idx]
    if (!text) { setStage(STAGE.LISTENING); return }  // safety guard
    if (muted) { setStage(STAGE.LISTENING); return }
    setStage(STAGE.SPEAKING)
    speak(text, () => {
      try { window.speechSynthesis?.cancel() } catch (_) {}
      setStage(STAGE.LISTENING)
    })
  }, [muted, speak])

  // ── Start interview ───────────────────────────────────────────────────────
  const startInterview = async () => {
    unlockAudio()
    setLoading(true); setError(null)
    if (camStatus !== 'granted') { const ok = await requestCam(); if (!ok) { setLoading(false); return } }
    try {
      const raw = await callGroq(promptQuestions({ job, resumeText: resumeRef.current, jd: jdRef.current }))
      const cleaned = raw.replace(/```json|```/g, '').trim()
      const match = cleaned.match(/\[[\s\S]*\]/)
      const qs: string[] = JSON.parse(match ? match[0] : cleaned)
      questionsRef.current = qs           // update ref BEFORE the setTimeout so speakQ sees them
      setQuestions(qs); setQIdx(0); setTranscript([]); setElapsed(0)
      violRef.current = { tab: 0, fs: 0, face: 0 }
      setViolations({ tab: 0, fs: 0, face: 0 })
      autoSubRef.current = false; setWarning(null)
      try { await document.documentElement.requestFullscreen() } catch (_) {}
      setTimeout(() => speakQ(0), 400)
    } catch (e) {
      setError('Failed to generate questions. Check connection and try again.')
      console.error(e)
    } finally { setLoading(false) }
  }

  // ── Answer actions ────────────────────────────────────────────────────────
  const submitAnswer = useCallback(async () => {
    stopListening()
    let answer = accRef.current || liveText || ''
    if (sttMode === 'whisper' && !answer) {
      setLiveText('Transcribing…')
      await finishWhisper(text => { accRef.current = text; setLiveText(text) })
      answer = accRef.current
    }
    setTranscript(prev => [...prev, { question: questionsRef.current[qIdx] ?? '', answer }])
    setLiveText(''); setStage(STAGE.BETWEEN)
  }, [qIdx, liveText, sttMode, stopListening, finishWhisper])

  const skipQuestion = useCallback(() => {
    stopListening()
    setTranscript(prev => [...prev, { question: questionsRef.current[qIdx] ?? '', answer: '(skipped)' }])
    setLiveText(''); setStage(STAGE.BETWEEN)
  }, [qIdx, stopListening])

  const reAnswer = useCallback(() => {
    setTranscript(prev => prev.slice(0, -1))
    setStage(STAGE.LISTENING)
  }, [])

  const nextQuestion = useCallback(() => {
    const next = qIdx + 1
    if (next < questionsRef.current.length) { setQIdx(next); speakQ(next) }
    else finishRef.current?.()
  }, [qIdx, speakQ])

  // ── Finish interview ──────────────────────────────────────────────────────
  const finishInterview = useCallback(async () => {
    if (document.fullscreenElement) { try { await document.exitFullscreen() } catch (_) {} }
    camStream?.getTracks().forEach(t => t.stop())
    micStreamRef.current?.getTracks().forEach(t => t.stop())
    micStreamRef.current = null
    stopListening(); stopSpeaking()
    setStage(STAGE.PROCESSING); setLoading(true)
    const currentJd = jdRef.current
    const finalTranscript = transcriptRef.current
    try {
      const raw = await callGroq(promptFeedback({ job, transcript: finalTranscript, jd: currentJd }))
      const clean = raw.replace(/```json|```/g, '').trim()
      const match = clean.match(/\{[\s\S]*\}/)
      const fb = JSON.parse(match ? match[0] : clean) as FeedbackData
      fb.violations = { ...violRef.current }
      fb.autoSubmitted = autoSubRef.current
      setFeedback(fb); setStage(STAGE.REPORT)
    } catch (e) {
      setError('Failed to generate feedback.')
      setStage(STAGE.BETWEEN)
      console.error(e)
    } finally { setLoading(false) }
  }, [camStream, stopListening, stopSpeaking, job])

  useEffect(() => { finishRef.current = finishInterview }, [finishInterview])

  const reset = () => {
    setStage(STAGE.SETUP); setQuestions([]); setQIdx(0); setTranscript([])
    setFeedback(null); setElapsed(0); setLiveText(''); setError(null); setWarning(null)
  }

  // ── RENDER: SETUP ─────────────────────────────────────────────────────────
  if (stage === STAGE.SETUP) {
    const skills = parseSkills(jd, job.requiredSkills || [])

    return (
      <div style={G.page}>
        <Navbar />
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '1.5rem 1rem 3rem' }}>
          <Link href="/candidate/applications" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b', textDecoration: 'none', marginBottom: '1.5rem' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back to applications
          </Link>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '1.75rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🎤</div>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-.02em' }}>Practice Interview</h1>
              <p style={{ margin: 0, fontSize: 13, color: '#475569' }}>{job.title} · {job.companyName}</p>
            </div>
          </div>

          {/* Job skills — auto-loaded */}
          <div style={{ ...G.card, marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <p style={{ ...G.label, margin: 0 }}>🎯 Skills being tested</p>
              <span style={{ fontSize: 11, background: 'rgba(52,211,153,.08)', border: '1px solid rgba(52,211,153,.2)', color: '#34d399', borderRadius: 20, padding: '2px 10px' }}>Auto-loaded from job</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.slice(0, 18).map(s => (
                <span key={s} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: 'rgba(99,102,241,.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,.25)' }}>{s}</span>
              ))}
            </div>

            {/* Candidate resume indicator */}
            {resumeText && (
              <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#475569' }}>
                <span style={{ color: '#34d399' }}>✓</span>
                Resume &amp; skills loaded from your profile
              </div>
            )}
          </div>

          {/* How it works */}
          <div style={{ ...G.card, marginBottom: '1rem' }}>
            <p style={{ ...G.label, marginBottom: 12 }}>How it works</p>
            {([['🔊', 'AI reads each question aloud (5 questions total)'], ['🎙️', 'You answer verbally — speech is transcribed live'], ['⏩', 'Click "Done" when finished speaking, or wait for auto-submit'], ['📊', 'Receive a detailed score report with feedback']] as [string, string][]).map(([ic, txt]) => (
              <div key={txt} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{ic}</span>
                <span style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{txt}</span>
              </div>
            ))}
          </div>

          {/* Advanced options — collapsed by default */}
          <div style={{ marginBottom: '1rem' }}>
            <button onClick={() => setShowAdvanced(v => !v)}
              style={{ background: 'none', border: 'none', color: '#475569', fontSize: 13, cursor: 'pointer', padding: '6px 0', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ display: 'inline-block', transform: showAdvanced ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform .2s' }}>▶</span>
              {showAdvanced ? 'Hide' : 'Edit JD / resume context'}
            </button>
            {showAdvanced && (
              <div style={{ ...G.card, marginTop: 8 }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={G.label}>📄 Your Resume / Skills</label>
                  <textarea value={resumeText} onChange={e => setResumeSynced(e.target.value)} rows={3} style={G.input} placeholder="Skills, experience, projects…" />
                </div>
                <div>
                  <label style={G.label}>💼 Job Description</label>
                  <textarea value={jd} onChange={e => setJdSynced(e.target.value)} rows={4} style={G.input} placeholder="Paste JD or skill list…" />
                </div>
              </div>
            )}
          </div>

          {/* Errors / warnings */}
          {!supported && (
            <div style={{ background: 'rgba(251,191,36,.07)', border: '1px solid rgba(251,191,36,.2)', borderRadius: 10, padding: '10px 14px', marginBottom: '1rem', fontSize: 13, color: '#fbbf24' }}>
              ⚠️ Voice recognition may not be fully supported. Use Chrome or Edge for best results.
            </div>
          )}
          {error && (
            <div style={{ background: 'rgba(248,113,113,.07)', border: '1px solid rgba(248,113,113,.2)', borderRadius: 10, padding: '10px 14px', marginBottom: '1rem', fontSize: 13, color: '#f87171' }}>
              {error}
            </div>
          )}

          {/* Action buttons */}
          {camStatus !== 'granted' ? (
            <button onClick={() => requestCam()} style={{ ...G.btnPrimary, background: 'rgba(99,102,241,.14)', color: '#818cf8', border: '1px solid rgba(99,102,241,.3)', marginBottom: 10 }}>
              📷 Enable Camera &amp; Microphone to begin
            </button>
          ) : (
            <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(52,211,153,.07)', border: '1px solid rgba(52,211,153,.2)', color: '#34d399', fontSize: 13, textAlign: 'center', marginBottom: 10 }}>
              ✅ Camera &amp; Microphone ready
            </div>
          )}

          <button onClick={startInterview} disabled={loading || camStatus !== 'granted'}
            style={{ ...G.btnPrimary, opacity: (loading || camStatus !== 'granted') ? 0.4 : 1, cursor: (loading || camStatus !== 'granted') ? 'not-allowed' : 'pointer', fontSize: 16 }}>
            {loading ? '⏳ Generating questions…' : '🚀 Start Practice Interview'}
          </button>
        </div>
      </div>
    )
  }

  // ── RENDER: PROCESSING ────────────────────────────────────────────────────
  if (stage === STAGE.PROCESSING) {
    return (
      <div style={{ ...G.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: 52, marginBottom: '1.25rem', display: 'inline-block', animation: 'spinAnim 2s linear infinite' }}>🧠</div>
          <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: 19 }}>Analysing your interview…</h3>
          <p style={{ color: '#475569', fontSize: 14 }}>Grading {transcript.length} answers · Generating personalised resources</p>
          <div style={{ margin: '2rem auto', width: 220, height: 3, background: 'rgba(255,255,255,.06)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: '45%', height: '100%', background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', borderRadius: 2, animation: 'slideAnim 1.5s ease-in-out infinite alternate' }} />
          </div>
          <style>{`@keyframes spinAnim{to{transform:rotate(360deg)}} @keyframes slideAnim{from{transform:translateX(-100%)}to{transform:translateX(250%)}}`}</style>
        </div>
      </div>
    )
  }

  // ── RENDER: INTERVIEW ─────────────────────────────────────────────────────
  if ([STAGE.SPEAKING, STAGE.LISTENING, STAGE.BETWEEN].includes(stage as never)) {
    const isSpeaking  = stage === STAGE.SPEAKING
    const isListening = stage === STAGE.LISTENING
    const isBetween   = stage === STAGE.BETWEEN
    const progress    = ((qIdx + (isBetween ? 1 : 0)) / questions.length) * 100
    const totalViol   = violations.tab + violations.fs + violations.face

    return (
      <div style={G.page}>
        {/* Camera background */}
        {camStream && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', background: '#000' }}>
            <video ref={bgVidCb} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', opacity: 0.3 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 10%, rgba(8,8,16,.9) 75%)' }} />
            <div style={{ position: 'absolute', top: 18, left: 18, display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(10px)', borderRadius: 20, padding: '5px 13px', border: '1px solid rgba(255,255,255,.08)' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#f87171', animation: 'pulseAnim 1.8s ease-in-out infinite' }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: '#e2e8f0' }}>LIVE</span>
            </div>
          </div>
        )}
        {camStream && <video ref={faceVidCb} autoPlay muted playsInline style={{ position: 'fixed', opacity: 0, pointerEvents: 'none', width: 1, height: 1, top: -9999 }} />}

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 620, margin: '0 auto', padding: '1.25rem 1rem' }}>
          {/* Violation warning */}
          {warning && (
            <div style={{ background: autoSubRef.current ? 'rgba(239,68,68,.1)' : 'rgba(251,191,36,.08)', border: `1px solid ${autoSubRef.current ? 'rgba(239,68,68,.35)' : 'rgba(251,191,36,.25)'}`, borderRadius: 12, padding: '11px 16px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 10, animation: 'shakeAnim .5s' }}>
              <span style={{ fontSize: 20 }}>{autoSubRef.current ? '🚫' : '⚠️'}</span>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: autoSubRef.current ? '#f87171' : '#fbbf24' }}>{warning}</p>
            </div>
          )}

          {totalViol > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 8, background: 'rgba(248,113,113,.07)', border: '1px solid rgba(248,113,113,.15)', marginBottom: '0.75rem', fontSize: 12, color: '#f87171' }}>
              🛡️ Violations: {totalViol}/3 &nbsp;(tab: {violations.tab} · fullscreen: {violations.fs} · camera: {violations.face})
            </div>
          )}

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '.06em' }}>
              {job.title} · {job.companyName}
            </p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#475569', fontVariantNumeric: 'tabular-nums' }}>{fmt(elapsed)}</span>
              <button onClick={() => setMuted(m => !m)} style={{ ...G.btnGhost, padding: '5px 12px', fontSize: 12 }}>
                {muted ? '🔇 Unmute' : '🔊 Mute AI'}
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 3, background: 'rgba(255,255,255,.06)', borderRadius: 2, marginBottom: '1.25rem', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', transition: 'width .6s ease', borderRadius: 2 }} />
          </div>

          {/* Question card */}
          <div style={{ ...G.card, backdropFilter: 'blur(14px)', background: 'rgba(255,255,255,.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '.07em' }}>
                Question {qIdx + 1} / {questions.length}
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, color: isSpeaking ? '#818cf8' : isListening ? '#34d399' : '#475569' }}>
                {isSpeaking ? 'AI speaking' : isListening ? '🎤 Your turn' : 'Review answer'}
              </span>
            </div>

            <p style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.7, margin: '0 0 1.25rem', color: '#f1f5f9' }}>
              {questions[qIdx]}
            </p>

            {/* SPEAKING state */}
            {isSpeaking && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 11, background: 'rgba(99,102,241,.09)', border: '1px solid rgba(99,102,241,.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Bars active color="#818cf8" />
                  <span style={{ fontSize: 13, color: '#818cf8' }}>AI reading question…</span>
                </div>
                <button onClick={() => { stopSpeaking(); setStage(STAGE.LISTENING) }}
                  style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(99,102,241,.35)', background: 'rgba(99,102,241,.14)', color: '#818cf8', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  🎤 Answer now
                </button>
              </div>
            )}

            {/* LISTENING state */}
            {isListening && (
              <div style={{ borderRadius: 11, background: 'rgba(52,211,153,.07)', border: '1px solid rgba(52,211,153,.22)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Bars active color="#34d399" />
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#34d399', display: 'block' }}>🎙️ Listening — speak your answer</span>
                      {sttMode === 'whisper' && (
                        <span style={{ fontSize: 11, color: '#475569' }}>Recording via microphone · transcript shown on Done</span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button onClick={() => { stopSpeaking(); speakQ(qIdx) }}
                      style={{ padding: '5px 10px', borderRadius: 8, border: '1px solid rgba(99,102,241,.3)', background: 'rgba(99,102,241,.1)', color: '#818cf8', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>
                      🔊 Replay
                    </button>
                    <button onClick={submitAnswer}
                      style={{ padding: '7px 18px', borderRadius: 8, border: 'none', background: '#34d399', color: '#080810', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Done ✓
                    </button>
                  </div>
                </div>
                <div style={{ padding: '0 14px 10px' }}>
                  {liveText
                    ? <p style={{ margin: 0, fontSize: 13, color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6 }}>&#34;{liveText}&#34;</p>
                    : <p style={{ margin: 0, fontSize: 12, color: '#1e293b' }}>Your words will appear here as you speak…</p>
                  }
                </div>
                <div style={{ padding: '0 14px 12px' }}>
                  <button onClick={skipQuestion} style={{ background: 'none', border: 'none', color: '#1e293b', fontSize: 12, cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>
                    Skip this question →
                  </button>
                </div>
              </div>
            )}

            {/* BETWEEN state */}
            {isBetween && transcript.length > 0 && (
              <div>
                <div style={{ padding: '12px 14px', borderRadius: 11, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', marginBottom: 12 }}>
                  <p style={{ margin: '0 0 5px', fontSize: 11, color: '#334155' }}>Your answer:</p>
                  <p style={{ margin: 0, fontSize: 13, color: '#94a3b8', lineHeight: 1.65 }}>
                    {transcript[transcript.length - 1].answer || <em style={{ color: '#334155' }}>No answer recorded</em>}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={reAnswer} style={{ ...G.btnGhost, flex: 1 }}>↩ Re-answer</button>
                  <button onClick={nextQuestion} style={{ flex: 2, padding: '10px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                    {qIdx + 1 < questions.length ? 'Next Question →' : 'Finish & Get Report →'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Previous answers */}
          {transcript.length > 0 && (
            <details style={G.card}>
              <summary style={{ fontSize: 13, color: '#475569', cursor: 'pointer' }}>
                Answered {transcript.length} of {questions.length}
              </summary>
              <div style={{ marginTop: '1rem' }}>
                {transcript.map((t, i) => (
                  <div key={i} style={{ borderLeft: '2px solid rgba(99,102,241,.25)', paddingLeft: 12, marginBottom: '1rem' }}>
                    <p style={{ margin: '0 0 4px', fontSize: 11, color: '#334155' }}>Q{i + 1}</p>
                    <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 500, color: '#e2e8f0' }}>{t.question}</p>
                    <p style={{ margin: 0, fontSize: 12, color: '#475569' }}>{t.answer}</p>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
        <style>{`
          @keyframes pulseAnim{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.35)}}
          @keyframes shakeAnim{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-4px)}40%,80%{transform:translateX(4px)}}
        `}</style>
      </div>
    )
  }

  // ── RENDER: REPORT ────────────────────────────────────────────────────────
  if (stage === STAGE.REPORT && feedback) {
    const score = feedback.overallScore ?? 0
    const sc    = score >= 75 ? '#34d399' : score >= 50 ? '#fbbf24' : '#f87171'

    return (
      <div style={G.page}>
        <Navbar />
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1rem' }}>

          <div style={{ ...G.card, textAlign: 'center', padding: '2.5rem 1.5rem' }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '.07em' }}>
              {job.title} · {job.companyName}
            </p>
            <h2 style={{ margin: '0 0 1.75rem', fontSize: 22, fontWeight: 700, letterSpacing: '-.02em' }}>Interview Complete</h2>
            <div style={{ display: 'inline-flex', position: 'relative', marginBottom: '1.25rem' }}>
              <ScoreRing pct={score} size={116} stroke={9} color={sc} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: sc }}>{score}</span>
                <span style={{ fontSize: 11, color: '#334155' }}>/ 100</span>
              </div>
            </div>
            <p style={{ margin: '0 0 1.5rem', fontSize: 14, color: '#64748b', lineHeight: 1.65, maxWidth: 420, marginInline: 'auto' }}>
              {feedback.overallAssessment}
            </p>
            {feedback.violations && Object.values(feedback.violations).some(v => v > 0) && (
              <p style={{ fontSize: 11, color: '#334155' }}>
                Violations — Tab: {feedback.violations.tab} · Fullscreen: {feedback.violations.fs} · Camera: {feedback.violations.face}
                {feedback.autoSubmitted && <span style={{ color: '#f87171', marginLeft: 8 }}>⚠️ Auto-submitted</span>}
              </p>
            )}
          </div>

          <div style={G.card}>
            <p style={{ ...G.label, marginBottom: 16 }}>Category Scores</p>
            {SCORE_CATS.map(c => <ScoreLine key={c.key} label={c.label} icon={c.icon} score={feedback.categoryScores?.[c.key] ?? 0} />)}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={G.card}>
              <p style={{ ...G.label, color: '#34d399', marginBottom: 10 }}>✅ Strengths</p>
              {(feedback.strengths || []).map((s, i) => <p key={i} style={{ margin: '0 0 7px', fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>• {s}</p>)}
            </div>
            <div style={G.card}>
              <p style={{ ...G.label, color: '#f87171', marginBottom: 10 }}>📈 To Improve</p>
              {(feedback.improvements || []).map((s, i) => <p key={i} style={{ margin: '0 0 7px', fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>• {s}</p>)}
            </div>
          </div>

          <div style={G.card}>
            <p style={{ ...G.label, marginBottom: 16 }}>Question Breakdown</p>
            {(feedback.perQuestionFeedback || []).map((q, i) => {
              const qc = q.score >= 70 ? '#34d399' : q.score >= 40 ? '#fbbf24' : '#f87171'
              return (
                <div key={i} style={{ borderLeft: `3px solid ${qc}`, paddingLeft: 14, marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: '#334155' }}>Q{i + 1}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: qc }}>{q.score}/100</span>
                  </div>
                  <p style={{ margin: '0 0 5px', fontSize: 14, fontWeight: 600, color: '#e2e8f0', lineHeight: 1.5 }}>{q.question}</p>
                  <p style={{ margin: '0 0 6px', fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>{q.feedback}</p>
                  <p style={{ margin: 0, fontSize: 11, color: '#334155', lineHeight: 1.5 }}>
                    <strong style={{ color: '#475569' }}>Ideal: </strong>{q.idealAnswer}
                  </p>
                </div>
              )
            })}
          </div>

          {(feedback.learningResources || []).length > 0 && (
            <div style={G.card}>
              <p style={{ ...G.label, marginBottom: 16 }}>📚 Learning Resources</p>
              {feedback.learningResources.map((item, i) => (
                <div key={i} style={{ marginBottom: '1.25rem' }}>
                  <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, color: '#818cf8' }}>{item.skill}</p>
                  {(item.resources || []).map((r, j) => {
                    let host = ''
                    try { host = new URL(r.url).hostname.replace('www.', '') } catch (_) {}
                    return (
                      <a key={j} href={r.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 11px', borderRadius: 9, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', marginBottom: 5, textDecoration: 'none', color: '#94a3b8', fontSize: 12 }}>
                        <span>{r.type === 'video' ? '▶️' : r.type === 'docs' ? '📖' : '🔗'}</span>
                        <span style={{ flex: 1 }}>{r.title}</span>
                        <span style={{ color: '#334155', fontSize: 11 }}>{host}</span>
                      </a>
                    )
                  })}
                </div>
              ))}
            </div>
          )}

          {(feedback.trendingTechnologies || []).length > 0 && (
            <div style={G.card}>
              <p style={{ ...G.label, marginBottom: 16 }}>🚀 Trending Technologies</p>
              {feedback.trendingTechnologies.map((t, i) => {
                let host = ''
                try { host = new URL(t.resource?.url || '').hostname.replace('www.', '') } catch (_) {}
                return (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < feedback.trendingTechnologies.length - 1 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 3px', fontSize: 13, fontWeight: 700 }}>{t.name}</p>
                      <p style={{ margin: 0, fontSize: 12, color: '#475569', lineHeight: 1.5 }}>{t.reason}</p>
                    </div>
                    {t.resource?.url && (
                      <a href={t.resource.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '7px 11px', borderRadius: 9, background: 'rgba(99,102,241,.09)', border: '1px solid rgba(99,102,241,.18)', textDecoration: 'none', color: '#818cf8', fontSize: 11, whiteSpace: 'nowrap' }}>
                        <span>{t.resource.type === 'video' ? '▶️' : '📖'}</span>
                        <span>{host}</span>
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          <details style={G.card}>
            <summary style={{ fontSize: 13, color: '#475569', cursor: 'pointer' }}>View full transcript ({transcript.length} questions)</summary>
            <div style={{ marginTop: '1rem' }}>
              {transcript.map((t, i) => (
                <div key={i} style={{ borderLeft: '2px solid rgba(99,102,241,.25)', paddingLeft: 12, marginBottom: '1.25rem' }}>
                  <p style={{ margin: '0 0 4px', fontSize: 11, color: '#334155' }}>Q{i + 1}</p>
                  <p style={{ margin: '0 0 5px', fontSize: 13, fontWeight: 500 }}>{t.question}</p>
                  <p style={{ margin: 0, fontSize: 13, color: '#475569' }}>{t.answer}</p>
                </div>
              ))}
            </div>
          </details>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={reset} style={{ ...G.btnGhost, flex: 1 }}>Retry Interview</button>
            <button onClick={() => {
              const txt = [
                `Interview Report — ${job.title} at ${job.companyName}`,
                `Overall Score: ${score}/100`,
                `\nCategories:`,
                ...SCORE_CATS.map(c => `  ${c.label}: ${feedback.categoryScores?.[c.key] ?? 0}/100`),
                `\nAssessment: ${feedback.overallAssessment}`,
                `\nStrengths:\n${(feedback.strengths || []).map(s => '  • ' + s).join('\n')}`,
                `\nImprovements:\n${(feedback.improvements || []).map(s => '  • ' + s).join('\n')}`,
              ].join('\n')
              const a = document.createElement('a')
              a.href = URL.createObjectURL(new Blob([txt], { type: 'text/plain' }))
              a.download = 'interview-report.txt'; a.click()
            }} style={{ ...G.btnPrimary, flex: 1 }}>
              Download Report ↓
            </button>
          </div>

        </div>
      </div>
    )
  }

  return null
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
function InterviewContent() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId') || ''

  const { data: job, isLoading: jobLoading } = useQuery<Job>({
    queryKey: ['job', jobId],
    queryFn: () => fetch(`/api/jobs/${jobId}`).then(r => r.json()),
    enabled: !!jobId,
  })

  const { data: profile } = useQuery({
    queryKey: ['candidate-profile'],
    queryFn: () => fetch('/api/candidate/profile').then(r => r.json()),
  })

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

  if (jobLoading || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-violet-500" />
      </div>
    )
  }

  // Build initial resume text from candidate profile
  const initialResumeText = (() => {
    if (!profile) return ''
    const skills = (profile.skills as Array<{ skill: string }> | undefined)?.map(s => s.skill).join(', ')
      || (profile.skillGroups as Array<{ skills: string[] }> | undefined)?.flatMap(g => g.skills).join(', ')
      || ''
    const parts = [
      profile.summary ? `Summary: ${profile.summary}` : '',
      skills ? `Skills: ${skills}` : '',
    ].filter(Boolean)
    return parts.join('\n')
  })()

  return <VoiceInterview job={job} initialResumeText={initialResumeText} />
}

export default function InterviewPage() {
  return (
    <Suspense>
      <InterviewContent />
    </Suspense>
  )
}
