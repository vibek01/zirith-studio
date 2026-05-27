'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { portfolioData } from '@/lib/portfolioData'
import { colors } from '@/lib/colors'
import ScrollReveal from '@/components/ui/ScrollReveal'
import TextReveal from '@/components/ui/TextReveal'

export default function WorkPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: colors.bg }}
    >
      {/* ── Mini Navbar ── */}
      <WorkNavbar />

      {/* ── Hero Header ── */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="label mb-6 block">Selected Work</span>
        </ScrollReveal>
        <TextReveal
          text="Every frame, a decision."
          tag="h1"
          className="text-hero text-carbon mb-8"
        />
        <ScrollReveal delay={0.25}>
          <p
            className="font-sans font-light text-xl max-w-xl leading-relaxed"
            style={{ color: colors.graphite }}
          >
            Four case studies. Four distinct problems. One methodology:{' '}
            <span className="font-medium text-carbon">
              motion engineered to convert.
            </span>
          </p>
        </ScrollReveal>

        {/* Divider */}
        <ScrollReveal delay={0.35}>
          <div
            className="mt-12 h-px max-w-full"
            style={{
              background: `linear-gradient(90deg, ${colors.accent}40, transparent)`,
            }}
          />
        </ScrollReveal>
      </section>

      {/* ── Case Studies Grid ── */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="space-y-6">
          {portfolioData.map((item, i) => (
            <WorkIndexCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section
        className="border-t py-24 text-center"
        style={{ borderColor: colors.surface2, background: colors.surface }}
      >
        <ScrollReveal>
          <p className="label mb-5">Ready to be next?</p>
          <h2
            className="font-serif text-4xl md:text-5xl text-carbon mb-8 leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Let&apos;s build something{' '}
            <em className="not-italic" style={{ color: colors.accent }}>
              that compels.
            </em>
          </h2>
          <Link
            href="/"
            className="inline-flex items-center gap-3 font-sans font-medium text-sm px-8 py-4 rounded-full transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
              color: 'white',
              boxShadow: `0 4px 24px ${colors.accentGlow}`,
            }}
            data-umami-event="Book Meeting (Work Page)"
          >
            Book a Strategy Meeting
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </Link>
        </ScrollReveal>
      </section>
    </main>
  )
}

// ── Minimal Navbar for inner pages ────────────────────────────────────────────
function WorkNavbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 py-4 glass border-b"
      style={{ borderColor: 'rgba(255,255,255,0.4)' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-carbon hover:text-accent transition-colors duration-200"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          ZIRITH
        </Link>
        <div className="flex items-center gap-6">
          <span
            className="font-mono text-[10px] tracking-[0.18em] uppercase"
            style={{ color: colors.accentLight }}
          >
            Our Work
          </span>
          <Link
            href="/#bento"
            className="font-sans text-sm text-graphite hover:text-carbon transition-colors duration-200"
          >
            ← Back to Site
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

// ── Horizontal list-style card ─────────────────────────────────────────────────
function WorkIndexCard({
  item,
  index,
}: {
  item: (typeof portfolioData)[0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <ScrollReveal delay={index * 0.1}>
      <Link href={`/work/${item.id}`} tabIndex={-1}>
        <motion.article
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="group relative grid grid-cols-1 md:grid-cols-12 gap-0 rounded-2xl overflow-hidden cursor-pointer"
          style={{
            border: '1px solid rgba(26,26,24,0.07)',
            background: colors.surface,
            boxShadow: '0 2px 8px rgba(26,26,24,0.04)',
          }}
          animate={{
            boxShadow: hovered
              ? `0 12px 48px ${colors.accentGlow}, 0 2px 8px rgba(26,26,24,0.06)`
              : '0 2px 8px rgba(26,26,24,0.04)',
            borderColor: hovered ? 'rgba(10,74,235,0.18)' : 'rgba(26,26,24,0.07)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Index number */}
          <div
            className="hidden md:flex md:col-span-1 items-center justify-center border-r py-8"
            style={{ borderColor: 'rgba(26,26,24,0.05)' }}
          >
            <span
              className="font-mono text-2xl font-medium"
              style={{ color: hovered ? colors.accent : colors.surface2 }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Video thumbnail */}
          <div className="md:col-span-3 relative overflow-hidden" style={{ minHeight: 180 }}>
            <motion.video
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                position: 'absolute',
                inset: 0,
              }}
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(26,26,24,0.25)' }}
            />
            {/* Featured badge */}
            {item.featured && (
              <div
                className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.18em] uppercase text-white px-2 py-1 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
                }}
              >
                Featured
              </div>
            )}
          </div>

          {/* Text content */}
          <div
            className="md:col-span-6 flex flex-col justify-center px-8 py-8 border-r"
            style={{ borderColor: 'rgba(26,26,24,0.05)' }}
          >
            <p
              className="font-mono text-[10px] tracking-[0.18em] uppercase mb-3"
              style={{ color: colors.accentLight }}
            >
              {item.category} · {item.year}
            </p>
            <h2
              className="font-serif text-2xl md:text-3xl text-carbon mb-3 leading-snug"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {item.title}
            </h2>
            <p
              className="font-sans font-light text-base leading-relaxed"
              style={{ color: colors.graphite }}
            >
              {item.heroSummary.length > 160
                ? item.heroSummary.slice(0, 160) + '…'
                : item.heroSummary}
            </p>
          </div>

          {/* CTA arrow */}
          <div className="md:col-span-2 flex items-center justify-center px-6 py-8">
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="font-mono text-[10px] tracking-[0.16em] uppercase"
                style={{ color: hovered ? colors.accent : colors.warmGrey }}
              >
                View Case
              </span>
              <motion.div
                className="w-10 h-10 rounded-full border flex items-center justify-center"
                animate={{
                  borderColor: hovered ? colors.accent : 'rgba(26,26,24,0.12)',
                  background: hovered ? colors.accentSubtle : 'transparent',
                }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke={hovered ? colors.accent : colors.graphite}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom accent bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 origin-left"
            style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentLight})` }}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.article>
      </Link>
    </ScrollReveal>
  )
}
