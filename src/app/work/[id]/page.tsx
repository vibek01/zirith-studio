'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { portfolioData } from '@/lib/portfolioData'
import { colors } from '@/lib/colors'
import ScrollReveal from '@/components/ui/ScrollReveal'
import TextReveal from '@/components/ui/TextReveal'

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getAdjacentProjects(currentId: string) {
  const idx = portfolioData.findIndex((p) => p.id === currentId)
  const prev = idx > 0 ? portfolioData[idx - 1] : null
  const next = idx < portfolioData.length - 1 ? portfolioData[idx + 1] : null
  return { prev, next }
}

// ─── Case Study Navbar ─────────────────────────────────────────────────────────
function CaseStudyNavbar({ title }: { title: string }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b py-3' : 'bg-transparent py-5'
      }`}
      style={{ borderColor: scrolled ? 'rgba(255,255,255,0.4)' : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-carbon hover:text-accent transition-colors duration-200"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          ZIRITH
        </Link>

        {/* Current project name — fades in when scrolled */}
        <motion.span
          className="font-sans text-sm text-graphite hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.span>

        {/* Back link */}
        <Link
          href="/work"
          className="flex items-center gap-2 font-sans text-sm text-graphite hover:text-carbon transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 7H2M6 3l-4 4 4 4" />
          </svg>
          All Work
        </Link>
      </div>
    </motion.nav>
  )
}

// ─── Parallax Hero Video ───────────────────────────────────────────────────────
function HeroVideo({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '75vh', minHeight: 480, maxHeight: 800 }}
    >
      {/* Parallax video layer */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </motion.div>

      {/* Gradient scrim — bottom heavy */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(26,26,24,0.3) 0%, rgba(26,26,24,0.1) 40%, rgba(232,239,245,0.95) 100%)',
        }}
      />

      {/* Title overlay — bottom left */}
      <div className="absolute bottom-12 left-0 right-0 max-w-7xl mx-auto px-6">
        <motion.p
          className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3 text-white/70"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Case Study
        </motion.p>
        <motion.h1
          className="font-serif leading-tight"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            background: 'linear-gradient(135deg, #0A4AEB 0%, #3B7AFF 28%, #8AB4FF 55%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            filter: 'drop-shadow(0 2px 16px rgba(10,74,235,0.35))',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h1>
      </div>
    </div>
  )
}

// ─── Meta row ─────────────────────────────────────────────────────────────────
function MetaRow({
  category,
  year,
  deliverable,
}: {
  category: string
  year: string
  deliverable: string
}) {
  const items = [
    { label: 'Category', value: category },
    { label: 'Year', value: year },
    { label: 'Deliverable', value: deliverable },
  ]
  return (
    <ScrollReveal>
      <div
        className="flex flex-wrap gap-0 rounded-2xl overflow-hidden border"
        style={{ borderColor: 'rgba(26,26,24,0.07)', background: colors.surface }}
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            className="flex-1 min-w-[140px] px-7 py-5 border-r last:border-r-0"
            style={{ borderColor: 'rgba(26,26,24,0.07)' }}
          >
            <p className="label mb-1.5">{item.label}</p>
            <p className="font-serif-alt text-lg text-carbon font-medium">{item.value}</p>
          </div>
        ))}
      </div>
    </ScrollReveal>
  )
}

// ─── Key Points list ──────────────────────────────────────────────────────────
function KeyPoints({
  points,
}: {
  points: { number: string; heading: string; body: string }[]
}) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div className="space-y-0 rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(26,26,24,0.07)' }}>
      {points.map((pt, i) => (
        <ScrollReveal key={pt.number} delay={i * 0.07}>
          <motion.div
            className="border-b last:border-b-0 cursor-pointer"
            style={{ borderColor: 'rgba(26,26,24,0.07)' }}
            animate={{
              background:
                activeIdx === i
                  ? `linear-gradient(135deg, ${colors.surface} 0%, rgba(10,74,235,0.04) 100%)`
                  : colors.bg,
            }}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
          >
            <div className="flex items-start gap-6 px-7 py-6">
              <motion.span
                className="font-mono text-sm font-medium shrink-0 mt-0.5"
                animate={{ color: activeIdx === i ? colors.accent : colors.warmGrey }}
              >
                {pt.number}
              </motion.span>
              <div className="flex-1">
                <motion.h4
                  className="font-serif-alt text-lg font-medium mb-0"
                  animate={{ color: activeIdx === i ? colors.carbon : colors.carbon }}
                >
                  {pt.heading}
                </motion.h4>
                <AnimatePresence initial={false}>
                  {activeIdx === i && (
                    <motion.p
                      className="font-sans font-light text-base leading-relaxed mt-3"
                      style={{ color: colors.graphite }}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      {pt.body}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              {/* Expand indicator */}
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke={activeIdx === i ? colors.accent : colors.warmGrey}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 mt-1"
                animate={{ rotate: activeIdx === i ? 45 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <path d="M8 3v10M3 8h10" />
              </motion.svg>
            </div>
          </motion.div>
        </ScrollReveal>
      ))}
    </div>
  )
}

// ─── Project navigation (prev / next) ─────────────────────────────────────────
function ProjectNav({
  prev,
  next,
}: {
  prev: (typeof portfolioData)[0] | null
  next: (typeof portfolioData)[0] | null
}) {
  return (
    <section
      className="border-t mt-24"
      style={{ borderColor: colors.surface2 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x" style={{ '--tw-divide-opacity': '1' } as React.CSSProperties}>
          {/* Previous */}
          <div className="py-12 md:pr-12">
            {prev ? (
              <NavCard item={prev} direction="prev" />
            ) : (
              <div className="flex items-center gap-3 opacity-30">
                <span className="label">First project</span>
              </div>
            )}
          </div>
          {/* Next */}
          <div className="py-12 md:pl-12">
            {next ? (
              <NavCard item={next} direction="next" />
            ) : (
              <div className="flex flex-col items-end text-right">
                <span className="label mb-3" style={{ color: colors.warmGrey }}>
                  That&apos;s all for now
                </span>
                <Link
                  href="/work"
                  className="font-serif-alt text-2xl text-carbon hover:text-accent transition-colors duration-200"
                >
                  View all work →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function NavCard({
  item,
  direction,
}: {
  item: (typeof portfolioData)[0]
  direction: 'prev' | 'next'
}) {
  const [hovered, setHovered] = useState(false)
  const isPrev = direction === 'prev'

  return (
    <Link href={`/work/${item.id}`}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`flex flex-col gap-3 ${isPrev ? 'items-start' : 'items-end text-right'}`}
      >
        <span className="label" style={{ color: colors.warmGrey }}>
          {isPrev ? '← Previous' : 'Next →'}
        </span>
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: colors.accentLight }}>
          {item.category}
        </p>
        <motion.h3
          className="font-serif text-3xl md:text-4xl text-carbon leading-tight"
          style={{ fontFamily: 'var(--font-serif)' }}
          animate={{ color: hovered ? colors.accent : colors.carbon }}
          transition={{ duration: 0.2 }}
        >
          {item.title}
        </motion.h3>
        <p
          className="font-sans font-light text-sm max-w-xs leading-relaxed"
          style={{ color: colors.graphite }}
        >
          {item.subtitle}
        </p>
      </motion.div>
    </Link>
  )
}

// ─── Inline video player (full width, no controls) ────────────────────────────
function FullWidthVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true
          videoRef.current?.play().catch(() => {})
        }
      },
      { threshold: 0.3 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <ScrollReveal>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          aspectRatio: '16/9',
          background: colors.surface2,
          border: '1px solid rgba(26,26,24,0.07)',
        }}
      >
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Soft inner shadow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
        />
      </div>
    </ScrollReveal>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
interface PageProps {
  params: { id: string }
}

export default function CaseStudyPage({ params }: PageProps) {
  const item = portfolioData.find((p) => p.id === params.id)
  if (!item) notFound()

  const { prev, next } = getAdjacentProjects(item.id)

  return (
    <main style={{ background: colors.bg }}>
      {/* SEO */}
      <title>{`${item.title} — Zirith Studio Case Study`}</title>

      {/* Navbar */}
      <CaseStudyNavbar title={item.title} />

      {/* ── Hero video (full viewport height, parallax) ── */}
      <HeroVideo src={item.src} title={item.heroHeading} />

      {/* ── Content wrapper ── */}
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Intro block ── */}
        <section className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: Meta */}
            <div className="lg:col-span-4">
              <MetaRow
                category={item.category}
                year={item.year}
                deliverable={item.deliverable}
              />

              {/* Floating accent stat */}
              <ScrollReveal delay={0.2}>
                <div
                  className="mt-5 rounded-2xl p-6"
                  style={{
                    background: `linear-gradient(135deg, rgba(10,74,235,0.07) 0%, rgba(59,122,255,0.04) 100%)`,
                    border: `1px solid rgba(10,74,235,0.15)`,
                  }}
                >
                  <p
                    className="font-mono text-[10px] tracking-[0.18em] uppercase mb-2"
                    style={{ color: colors.accentLight }}
                  >
                    The Challenge
                  </p>
                  <p
                    className="font-sans font-light text-sm leading-relaxed"
                    style={{ color: colors.graphite }}
                  >
                    {item.challenge}
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: summary */}
            <div className="lg:col-span-8">
              <ScrollReveal>
                <p
                  className="font-mono text-[10px] tracking-[0.22em] uppercase mb-5"
                  style={{ color: colors.accentLight }}
                >
                  {item.category} · {item.subtitle}
                </p>
              </ScrollReveal>
              <TextReveal
                text={item.heroHeading.replace('\n', ' ')}
                tag="h2"
                className="text-section text-carbon mb-8"
              />
              <ScrollReveal delay={0.2}>
                <p
                  className="font-sans font-light text-xl leading-relaxed"
                  style={{ color: colors.graphite }}
                >
                  {item.heroSummary}
                </p>
              </ScrollReveal>

              {/* Thin divider */}
              <ScrollReveal delay={0.3}>
                <div
                  className="mt-8 h-px"
                  style={{ background: `linear-gradient(90deg, ${colors.accent}40, transparent)` }}
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── Full-width inline video ── */}
        <section className="pb-20">
          <FullWidthVideo src={item.src} />
        </section>

        {/* ── Key Points ── */}
        <section className="pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left label */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <span className="label block mb-3">What We Solved</span>
                <h3
                  className="font-serif text-3xl text-carbon leading-snug"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  The work,<br />
                  <em className="not-italic" style={{ color: colors.accent }}>
                    explained.
                  </em>
                </h3>
              </ScrollReveal>
            </div>

            {/* Right: accordion key points */}
            <div className="lg:col-span-9">
              <KeyPoints points={item.keyPoints} />
            </div>
          </div>
        </section>

        {/* ── Outcome block ── */}
        <section
          className="mb-24 rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1A1A18 0%, #26231D 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <ScrollReveal>
            <div className="p-10 md:p-16">
              <p
                className="font-mono text-[10px] tracking-[0.22em] uppercase mb-6"
                style={{ color: colors.accentLight }}
              >
                The Outcome
              </p>
              <blockquote
                className="font-serif leading-snug text-white mb-8"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
                }}
              >
                &ldquo;{item.outcome}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div
                  className="h-px w-12"
                  style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }}
                />
                <span
                  className="font-mono text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {item.deliverable} · {item.year}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>

      {/* ── Project Nav ── */}
      <ProjectNav prev={prev} next={next} />

      {/* ── Footer CTA ── */}
      <section
        className="border-t py-20 text-center"
        style={{ borderColor: colors.surface2, background: colors.surface }}
      >
        <ScrollReveal>
          <p className="label mb-5">Want results like these?</p>
          <h2
            className="font-serif text-4xl md:text-5xl text-carbon mb-8 leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Let&apos;s build your{' '}
            <em className="not-italic" style={{ color: colors.accent }}>
              next case study.
            </em>
          </h2>
          <Link
            href="/"
            className="inline-flex items-center gap-3 font-sans font-medium text-sm px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
              color: 'white',
              boxShadow: `0 4px 24px ${colors.accentGlow}`,
            }}
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
