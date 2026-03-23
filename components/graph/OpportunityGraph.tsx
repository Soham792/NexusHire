'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { scoreNodeColor } from '@/lib/utils'

export interface JobNode {
  id: string
  title: string
  companyName: string
  location: string
  score: number
  employmentType?: string
  locationType?: string
  requiredSkills?: Array<{ skill: string; weight: number }>
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

interface CandidateCenter {
  id: string
  label: string
  isCandidate: true
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

type OGNode = JobNode | CandidateCenter

interface OGLink {
  source: string | OGNode
  target: string | OGNode
  score: number
}

interface ClusterLink {
  source: string | OGNode
  target: string | OGNode
  sharedCount: number
}

interface OpportunityGraphProps {
  jobs: JobNode[]
  candidateName: string
  selectedJobId?: string | null
  onJobClick?: (job: JobNode) => void
  height?: number
}

export function OpportunityGraph({
  jobs,
  candidateName,
  selectedJobId,
  onJobClick,
  height = 540,
}: OpportunityGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!svgRef.current || !wrapRef.current || !jobs.length) return

    const width = wrapRef.current.clientWidth || 800
    const cx = width / 2
    const cy = height / 2

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', height)

    // ── Defs ─────────────────────────────────────────────────────────────────
    const defs = svg.append('defs')
    const glow = defs.append('filter').attr('id', 'og-glow').attr('x', '-30%').attr('y', '-30%').attr('width', '160%').attr('height', '160%')
    glow.append('feGaussianBlur').attr('stdDeviation', 4).attr('result', 'blur')
    const merge = glow.append('feMerge')
    merge.append('feMergeNode').attr('in', 'blur')
    merge.append('feMergeNode').attr('in', 'SourceGraphic')

    // Candidate glow (purple)
    const cglow = defs.append('filter').attr('id', 'og-cglow').attr('x', '-40%').attr('y', '-40%').attr('width', '180%').attr('height', '180%')
    cglow.append('feGaussianBlur').attr('stdDeviation', 8).attr('result', 'blur')
    const cm = cglow.append('feMerge')
    cm.append('feMergeNode').attr('in', 'blur')
    cm.append('feMergeNode').attr('in', 'SourceGraphic')

    // ── Nodes & Links ─────────────────────────────────────────────────────────
    const centerNode: CandidateCenter = {
      id: '__candidate__',
      label: candidateName,
      isCandidate: true,
      fx: cx,
      fy: cy,
    }

    const allNodes: OGNode[] = [centerNode, ...jobs]

    const mainLinks: OGLink[] = jobs.map((j) => ({
      source: '__candidate__',
      target: j.id,
      score: j.score,
    }))

    // Skill-cluster edges between similar jobs (shared 2+ skills)
    const clusterLinks: ClusterLink[] = []
    for (let i = 0; i < jobs.length; i++) {
      const setA = new Set((jobs[i].requiredSkills || []).map((s) => s.skill.toLowerCase()))
      for (let k = i + 1; k < jobs.length; k++) {
        const shared = (jobs[k].requiredSkills || []).filter((s) => setA.has(s.skill.toLowerCase())).length
        if (shared >= 2) clusterLinks.push({ source: jobs[i].id, target: jobs[k].id, sharedCount: shared })
      }
    }

    // ── Simulation ────────────────────────────────────────────────────────────
    const nodeRadius = (d: OGNode) => {
      if ('isCandidate' in d) return 44
      return 14 + (d as JobNode).score / 4.8
    }

    const sim = d3.forceSimulation<OGNode>(allNodes)
      .force(
        'link',
        d3.forceLink<OGNode, OGLink>(mainLinks)
          .id((d) => d.id)
          .distance((d) => Math.max(120, 230 - d.score * 1.4))
          .strength(0.7),
      )
      .force(
        'cluster',
        d3.forceLink<OGNode, ClusterLink>(clusterLinks)
          .id((d) => d.id)
          .distance(80)
          .strength((d) => Math.min(d.sharedCount * 0.04, 0.15)),
      )
      .force('charge', d3.forceManyBody<OGNode>().strength(-380))
      .force('center', d3.forceCenter(cx, cy))
      .force('collision', d3.forceCollide<OGNode>().radius((d) => nodeRadius(d) + 10))

    // ── SVG groups ────────────────────────────────────────────────────────────
    const root = svg.call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.25, 3])
        .on('zoom', (e) => g.attr('transform', e.transform)),
    ).append('g') as d3.Selection<SVGGElement, unknown, null, undefined>

    const g = root

    // Cluster dashed lines
    const clusterLineG = g.append('g')
    const clusterLine = clusterLineG
      .selectAll<SVGLineElement, ClusterLink>('line')
      .data(clusterLinks)
      .enter()
      .append('line')
      .attr('stroke', 'rgba(139,92,246,0.13)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,5')

    // Main score lines
    const mainLineG = g.append('g')
    const mainLine = mainLineG
      .selectAll<SVGLineElement, OGLink>('line')
      .data(mainLinks)
      .enter()
      .append('line')
      .attr('stroke', (d) => {
        const c = scoreNodeColor(d.score)
        return `${c}55`
      })
      .attr('stroke-width', (d) => 1.2 + d.score / 50)

    // ── Job nodes ─────────────────────────────────────────────────────────────
    const jobG = g.append('g')
      .selectAll<SVGGElement, JobNode>('g')
      .data(jobs)
      .enter()
      .append('g')
      .attr('class', 'graph-node')
      .style('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, JobNode>()
          .on('start', (ev, d) => { if (!ev.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y })
          .on('drag', (ev, d) => { d.fx = ev.x; d.fy = ev.y })
          .on('end', (ev, d) => { if (!ev.active) sim.alphaTarget(0); d.fx = null; d.fy = null }),
      )
      .on('click', (_, d) => onJobClick?.(d))

    // Outer glow ring for high-match
    jobG.filter((d) => d.score >= 75)
      .append('circle')
      .attr('r', (d) => nodeRadius(d) + 6)
      .attr('fill', 'none')
      .attr('stroke', (d) => `${scoreNodeColor(d.score)}33`)
      .attr('stroke-width', 4)
      .attr('filter', 'url(#og-glow)')

    // Main circle
    jobG.append('circle')
      .attr('r', (d) => nodeRadius(d))
      .attr('fill', (d) => `${scoreNodeColor(d.score)}1A`)
      .attr('stroke', (d) => d.id === selectedJobId ? '#c4b5fd' : scoreNodeColor(d.score))
      .attr('stroke-width', (d) => d.id === selectedJobId ? 3 : 1.5)

    // Score text
    jobG.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', (d) => Math.min(12, 8 + d.score / 18))
      .attr('font-weight', 'bold')
      .attr('fill', (d) => scoreNodeColor(d.score))
      .style('pointer-events', 'none')
      .text((d) => `${d.score}%`)

    // Job title
    jobG.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', (d) => nodeRadius(d) + 13)
      .attr('font-size', 9.5)
      .attr('fill', 'rgba(255,255,255,0.7)')
      .style('pointer-events', 'none')
      .text((d) => (d.title.length > 18 ? d.title.slice(0, 16) + '…' : d.title))

    // Company
    jobG.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', (d) => nodeRadius(d) + 25)
      .attr('font-size', 8)
      .attr('fill', 'rgba(255,255,255,0.35)')
      .style('pointer-events', 'none')
      .text((d) => (d.companyName.length > 14 ? d.companyName.slice(0, 12) + '…' : d.companyName))

    // ── Candidate center node ─────────────────────────────────────────────────
    const candG = g.append('g')

    // Pulse ring
    candG.append('circle')
      .attr('r', 58)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(139,92,246,0.12)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '5,4')

    candG.append('circle')
      .attr('r', 44)
      .attr('fill', 'rgba(109,40,217,0.2)')
      .attr('stroke', '#7c3aed')
      .attr('stroke-width', 2.5)
      .attr('filter', 'url(#og-cglow)')

    candG.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', 22)
      .text('👤')

    candG.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', 58)
      .attr('font-size', 10)
      .attr('font-weight', 'bold')
      .attr('fill', 'rgba(167,139,250,0.85)')
      .text('You')

    // ── Tick ─────────────────────────────────────────────────────────────────
    sim.on('tick', () => {
      clusterLine
        .attr('x1', (d) => ((d.source as OGNode).x ?? 0))
        .attr('y1', (d) => ((d.source as OGNode).y ?? 0))
        .attr('x2', (d) => ((d.target as OGNode).x ?? 0))
        .attr('y2', (d) => ((d.target as OGNode).y ?? 0))

      mainLine
        .attr('x1', (d) => ((d.source as OGNode).x ?? 0))
        .attr('y1', (d) => ((d.source as OGNode).y ?? 0))
        .attr('x2', (d) => ((d.target as OGNode).x ?? 0))
        .attr('y2', (d) => ((d.target as OGNode).y ?? 0))

      jobG.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`)
      candG.attr('transform', `translate(${centerNode.fx ?? cx},${centerNode.fy ?? cy})`)
    })

    return () => { sim.stop() }
  }, [jobs, candidateName, selectedJobId, height])

  return (
    <div ref={wrapRef} className="w-full">
      <svg ref={svgRef} className="rounded-xl border border-white/10 w-full" style={{ background: 'rgba(255,255,255,0.01)', height }} />
    </div>
  )
}
