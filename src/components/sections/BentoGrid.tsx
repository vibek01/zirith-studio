'use client'

import { motion } from 'framer-motion'
import AnimatedLineChart from '@/components/ui/AnimatedLineChart'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ScrollReveal from '@/components/ui/ScrollReveal'
import TextReveal from '@/components/ui/TextReveal'
import { colors } from '@/lib/colors'

// Flat, barely rising line for "status quo"
const statusQuoPoints: [number, number][] = [
  [0, 10], [1, 12], [2, 9], [3, 11], [4, 10], [5, 8], [6, 11], [7, 10], [8, 9], [9, 11],
]

// Strong rising line for "Zirith impact"
const impactPoints: [number, number][] = [
  [0, 5], [1, 12], [2, 22], [3, 35], [4, 48], [5, 58], [6, 68], [7, 76], [8, 84], [9, 92],
]

// Retention curves — shared Y domain (0–100) so visual difference is honest
const retentionZirith: [number, number][] = [
  [0, 100], [1, 95], [2, 90], [3, 88], [4, 86], [5, 84], [6, 83], [7, 82], [8, 82], [9, 82],
]
const retentionIndustry: [number, number][] = [
  [0, 100], [1, 62], [2, 40], [3, 27], [4, 18], [5, 12], [6, 8], [7, 6], [8, 5], [9, 4],
]

function BentoCell({
  children,
  className = '',
  delay = 0,
  style,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  style?: React.CSSProperties
}) {
  // Pass the col-span classes to the outer ScrollReveal (which is the actual grid item)
  const isColSpan2 = className.includes('lg:col-span-2')
  const wrapperClass = isColSpan2 ? 'lg:col-span-2' : 'lg:col-span-1'
  const innerClass = className.replace('lg:col-span-2', '').replace('lg:col-span-1', '').trim()

  return (
    <ScrollReveal delay={delay} className={wrapperClass}>
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(10, 74, 235, 0.08)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`rounded-2xl border border-border p-6 h-full bg-surface transition-colors ${innerClass}`}
        style={{
          boxShadow: '0 1px 3px rgba(26,26,24,0.04), 0 4px 20px rgba(26,26,24,0.03)',
          ...style,
        }}
      >
        {children}
      </motion.div>
    </ScrollReveal>
  )
}

function MetricPill({ value, label, muted = false }: { value: React.ReactNode; label: string; muted?: boolean }) {
  return (
    <div
      className={`rounded-xl p-3 border ${muted ? 'border-border' : 'border-accent/15'}`}
      style={{ background: muted ? 'rgba(255,255,255,0.4)' : colors.accentSubtle }}
    >
      <p className={`font-mono text-xl font-medium leading-none mb-1 ${muted ? 'text-graphite' : 'text-carbon'}`}>{value}</p>
      <p className="text-xs text-graphite font-sans">{label}</p>
    </div>
  )
}

export default function BentoGrid() {
  return (
    <section id="bento" className="py-28 md:py-36 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <ScrollReveal>
            <span className="label mb-4 block">Impact Dashboard</span>
          </ScrollReveal>
          <TextReveal
            text="The difference is visceral."
            tag="h2"
            className="text-section text-carbon mb-5"
          />
          <ScrollReveal delay={0.2}>
            <p className="font-sans font-light text-lg text-graphite leading-relaxed">
              See what happens when behavioral pacing meets elite motion craft.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Row 1 ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Status Quo card */}
          <BentoCell delay={0} className="bg-surface">
            <div className="opacity-90">
              <div className="label mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-graphite inline-block" />
                Without Zirith
              </div>

              {/* Big headline metric */}
              <div className="mb-5">
                <p className="font-mono text-5xl font-medium text-graphite leading-none mb-1">
                  18%
                </p>
                <p className="font-sans text-sm text-graphite">Completion rate</p>
              </div>

              {/* Chart — responsive width */}
              <div className="mb-5 w-full">
                <p className="label mb-2" style={{ color: '#6B6B66' }}>Engagement trajectory</p>
                <div className="w-full overflow-hidden">
                  <AnimatedLineChart
                    points={statusQuoPoints}
                    muted
                    width={400}
                    height={80}
                  />
                </div>
              </div>

              {/* Three metric pills */}
              <div className="flex flex-wrap gap-3">
                <div className="flex-1 min-w-[120px]">
                  <MetricPill value="1.0×" label="Pipeline velocity" muted />
                </div>
                <div className="flex-1 min-w-[120px]">
                  <MetricPill value="0.4%" label="Demo conversions" muted />
                </div>
                <div className="flex-1 min-w-[120px]">
                  <MetricPill value="34s" label="Avg. watch time" muted />
                </div>
              </div>
            </div>
          </BentoCell>

          {/* With Zirith — impact hero card */}
          <BentoCell
            delay={0.1}
            style={{ background: colors.gradientCard }}
          >
            <div className="label mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
              With Zirith
            </div>

            {/* Big headline metric */}
            <div className="mb-5">
              <p className="font-mono text-5xl font-medium text-accent leading-none mb-1">
                <AnimatedCounter to={82} suffix="%" duration={2.2} />
              </p>
              <p className="font-sans text-sm text-graphite">Completion rate</p>
            </div>

            {/* Chart — responsive width */}
            <div className="mb-5 w-full">
              <p className="label mb-2" style={{ color: '#6B6B66' }}>Engagement trajectory</p>
              <div className="w-full overflow-hidden">
                <AnimatedLineChart
                  points={impactPoints}
                  color={colors.accent}
                  width={400}
                  height={80}
                />
              </div>
            </div>

            {/* Three metric pills — using flex-wrap to prevent overflow */}
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[120px]">
                <MetricPill
                  value={<AnimatedCounter to={3.2} suffix="×" decimals={1} duration={2} />}
                  label="Pipeline velocity"
                />
              </div>
              <div className="flex-1 min-w-[120px]">
                <MetricPill
                  value={<AnimatedCounter to={3.8} suffix="%" decimals={1} duration={2.2} />}
                  label="Demo conversions"
                />
              </div>
              <div className="flex-1 min-w-[120px]">
                <MetricPill value="4m 12s" label="Avg. watch time" />
              </div>
            </div>
          </BentoCell>
        </div>

        {/* ── Row 2 ── */}
        <div className="grid grid-cols-1 gap-4">
          {/* Retention curves — shared Y domain (0–100) */}
          <BentoCell delay={0.15} className="bg-surface">
            <p className="label mb-5">Viewer retention curves</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="font-sans text-sm text-warm-grey mb-3 font-medium">
                  Industry avg. — steep drop
                </p>
                <div className="w-full overflow-hidden">
                  <AnimatedLineChart
                    points={retentionIndustry}
                    muted
                    width={500}
                    height={120}
                    yMin={0}
                    yMax={100}
                  />
                </div>
                <p className="font-mono text-xs text-warm-grey mt-2">
                  Drops to ~4% by end
                </p>
              </div>
              <div>
                <p
                  className="font-sans text-sm mb-3 font-medium"
                  style={{ color: colors.accent }}
                >
                  Zirith videos — stays high
                </p>
                <div className="w-full overflow-hidden">
                  <AnimatedLineChart
                    points={retentionZirith}
                    color={colors.accent}
                    width={500}
                    height={120}
                    yMin={0}
                    yMax={100}
                  />
                </div>
                <p className="font-mono text-xs text-accent mt-2">
                  Holds at 82% through the end
                </p>
              </div>
            </div>
          </BentoCell>
        </div>
      </div>
    </section>
  )
}
