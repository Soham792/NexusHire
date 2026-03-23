'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { scoreNodeColor } from '@/lib/utils'

export interface GraphNode {
  id: string
  type: 'job' | 'candidate'
  label: string
  score?: number
  stage?: string
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

export interface GraphLink {
  source: string | GraphNode
  target: string | GraphNode
  score: number
  stage: string
}

export interface OverlapLink {
  source: string
  target: string
  sharedSkills: string[]
}

interface ApplicationGraphProps {
  nodes: GraphNode[]
  links: GraphLink[]
  overlapLinks?: OverlapLink[]
  width?: number
  height?: number
  onNodeClick?: (node: GraphNode) => void
}

const STAGE_COLORS: Record<string, string> = {
  applied: '#60a5fa',
  under_review: '#facc15',
  shortlisted: '#34d399',
  interview: '#a78bfa',
  decision: '#fb923c',
  outcome: '#9ca3af',
}

export function ApplicationGraph({ nodes, links, overlapLinks = [], width = 800, height = 500, onNodeClick }: ApplicationGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !nodes.length) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const container = svg
      .attr('width', width)
      .attr('height', height)
      .call(
        d3.zoom<SVGSVGElement, unknown>()
          .scaleExtent([0.3, 3])
          .on('zoom', (event) => {
            g.attr('transform', event.transform)
          })
      )

    const g = container.append('g')

    // Arrowhead marker
    svg.append('defs').append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', 'rgba(139,92,246,0.5)')

    const simulation = d3.forceSimulation<GraphNode>(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links).id((d) => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide(40))

    // Skill-overlap edges (candidate–candidate thin dashed lines)
    const nodeById = new Map(nodes.map((n) => [n.id, n]))
    const overlapLineData = overlapLinks
      .map((ol) => ({ ...ol, src: nodeById.get(ol.source), tgt: nodeById.get(ol.target) }))
      .filter((ol) => ol.src && ol.tgt)

    const overlapGroup = g.append('g')
    const overlapLine = overlapGroup
      .selectAll('line')
      .data(overlapLineData)
      .enter()
      .append('line')
      .attr('stroke', 'rgba(251,191,36,0.25)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,3')

    // Overlap tooltip labels (shown on each dashed line midpoint)
    const overlapLabel = overlapGroup
      .selectAll('text')
      .data(overlapLineData)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', 8)
      .attr('fill', 'rgba(251,191,36,0.5)')
      .text((d) => d.sharedSkills.slice(0, 2).join(', '))

    // Links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'graph-link')
      .attr('stroke', (d) => STAGE_COLORS[d.stage] || '#6366f1')
      .attr('stroke-width', (d) => 1 + d.score / 50)
      .attr('marker-end', 'url(#arrow)')

    // Link score labels
    const linkLabel = g.append('g')
      .selectAll('text')
      .data(links)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', 9)
      .attr('fill', 'rgba(255,255,255,0.4)')
      .text((d) => `${d.score}%`)

    // Nodes
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'graph-node')
      .style('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, GraphNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
          })
          .on('drag', (event, d) => {
            d.fx = event.x
            d.fy = event.y
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
          })
      )
      .on('click', (_, d) => onNodeClick?.(d))

    // Node circles
    node.append('circle')
      .attr('r', (d) => d.type === 'job' ? 24 : 18)
      .attr('fill', (d) => {
        if (d.type === 'job') return 'rgba(139,92,246,0.3)'
        return `${scoreNodeColor(d.score || 0)}33`
      })
      .attr('stroke', (d) => {
        if (d.type === 'job') return '#8b5cf6'
        return scoreNodeColor(d.score || 0)
      })
      .attr('stroke-width', 2)

    // Node icon/initial
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', (d) => d.type === 'job' ? 12 : 10)
      .attr('fill', 'white')
      .text((d) => d.type === 'job' ? '💼' : d.label[0]?.toUpperCase())

    // Node labels
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', (d) => (d.type === 'job' ? 34 : 28))
      .attr('font-size', 10)
      .attr('fill', 'rgba(255,255,255,0.7)')
      .text((d) => d.label.length > 15 ? d.label.slice(0, 12) + '…' : d.label)

    // Score badges for candidates
    node.filter((d) => d.type === 'candidate' && d.score !== undefined)
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('y', -22)
      .attr('font-size', 9)
      .attr('font-weight', 'bold')
      .attr('fill', (d) => scoreNodeColor(d.score || 0))
      .text((d) => `${d.score}%`)

    simulation.on('tick', () => {
      // Overlap lines (candidate–candidate)
      overlapLine
        .attr('x1', (d) => d.src!.x ?? 0)
        .attr('y1', (d) => d.src!.y ?? 0)
        .attr('x2', (d) => d.tgt!.x ?? 0)
        .attr('y2', (d) => d.tgt!.y ?? 0)
      overlapLabel
        .attr('x', (d) => ((d.src!.x ?? 0) + (d.tgt!.x ?? 0)) / 2)
        .attr('y', (d) => ((d.src!.y ?? 0) + (d.tgt!.y ?? 0)) / 2 - 4)

      link
        .attr('x1', (d) => (d.source as GraphNode).x!)
        .attr('y1', (d) => (d.source as GraphNode).y!)
        .attr('x2', (d) => (d.target as GraphNode).x!)
        .attr('y2', (d) => (d.target as GraphNode).y!)

      linkLabel
        .attr('x', (d) => ((d.source as GraphNode).x! + (d.target as GraphNode).x!) / 2)
        .attr('y', (d) => ((d.source as GraphNode).y! + (d.target as GraphNode).y!) / 2)

      node.attr('transform', (d) => `translate(${d.x},${d.y})`)
    })

    return () => {
      simulation.stop()
    }
  }, [nodes, links, overlapLinks, width, height, onNodeClick])

  return (
    <svg
      ref={svgRef}
      className="rounded-xl border border-white/10 bg-white/2"
      style={{ width: '100%', height }}
    />
  )
}
