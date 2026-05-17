'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { colors } from '@/lib/colors'

interface AnimatedLineChartProps {
  points: [number, number][]
  width?: number
  height?: number
  color?: string
  label?: string
  muted?: boolean
  /** Optional shared Y-axis domain for apples-to-apples comparison */
  yMin?: number
  yMax?: number
}

function pointsToPath(
  points: [number, number][],
  w: number,
  h: number,
  yMin?: number,
  yMax?: number
): string {
  if (points.length === 0) return ''
  const xs = points.map((p) => p[0])
  const ys = points.map((p) => p[1])
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  // Use provided domain or auto-detect
  const minY = yMin !== undefined ? yMin : Math.min(...ys)
  const maxY = yMax !== undefined ? yMax : Math.max(...ys)
  const pad = 10

  const toSvgX = (x: number) =>
    pad + ((x - minX) / (maxX - minX || 1)) * (w - pad * 2)
  const toSvgY = (y: number) =>
    h - pad - ((y - minY) / (maxY - minY || 1)) * (h - pad * 2)

  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(p[0]).toFixed(2)} ${toSvgY(p[1]).toFixed(2)}`)
    .join(' ')
}

export default function AnimatedLineChart({
  points,
  width = 280,
  height = 80,
  color = colors.accent,
  label,
  muted = false,
  yMin,
  yMax,
}: AnimatedLineChartProps) {
  const { ref, inView } = useInView<SVGSVGElement>({ threshold: 0.3, once: true })

  const path = pointsToPath(points, width, height, yMin, yMax)

  // End dot position using same domain
  const ys = points.map((p) => p[1])
  const xs = points.map((p) => p[0])
  const domainMinY = yMin !== undefined ? yMin : Math.min(...ys)
  const domainMaxY = yMax !== undefined ? yMax : Math.max(...ys)
  const domainMinX = Math.min(...xs)
  const domainMaxX = Math.max(...xs)
  const lastPt = points[points.length - 1]
  const endCx = lastPt
    ? 10 + ((lastPt[0] - domainMinX) / (domainMaxX - domainMinX || 1)) * (width - 20)
    : 0
  const endCy = lastPt
    ? height - 10 - ((lastPt[1] - domainMinY) / (domainMaxY - domainMinY || 1)) * (height - 20)
    : 0

  const gradId = `gradient-${color.replace('#', '')}-${muted ? 'm' : 'v'}`

  return (
    <div className="relative">
      {label && (
        <p className="label mb-2" style={{ color: muted ? colors.warmGrey : colors.graphite }}>
          {label}
        </p>
      )}
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={{ display: 'block', width: '100%', height: 'auto', maxHeight: height }}
        className="overflow-visible"
      >
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1={0}
            y1={height * ratio}
            x2={width}
            y2={height * ratio}
            stroke={muted ? 'rgba(168,168,162,0.18)' : 'rgba(26,26,24,0.05)'}
            strokeWidth={1}
          />
        ))}

        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={muted ? 0.07 : 0.14} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <motion.path
          d={`${path} L ${width - 10} ${height} L 10 ${height} Z`}
          fill={`url(#${gradId})`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Animated line */}
        <motion.path
          d={path}
          stroke={muted ? colors.warmGrey : color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { duration: 1.8, ease: 'easeOut', delay: 0.1 },
            opacity: { duration: 0.3 },
          }}
        />

        {/* End dot */}
        {points.length > 0 && (
          <motion.circle
            cx={endCx}
            cy={endCy}
            r={4}
            fill={muted ? colors.warmGrey : color}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 1.8, duration: 0.4, ease: 'backOut' }}
          />
        )}
      </svg>
    </div>
  )
}
