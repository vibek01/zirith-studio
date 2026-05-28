'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useInView as useFramerInView, AnimatePresence } from 'framer-motion'
import { portfolioData } from '@/lib/portfolioData'
import type { PortfolioItem } from '@/lib/portfolioData'
import { colors } from '@/lib/colors'
import TextReveal from '@/components/ui/TextReveal'
import ScrollReveal from '@/components/ui/ScrollReveal'

// ─── Decorative label strip (top of section) ──────────────────────────────────
function SectionLabel() {
  return (
    <ScrollReveal>
      <div className="flex items-center gap-4 mb-6">
        <span className="label">Selected Work</span>
        <div
          className="h-px flex-1 max-w-[60px]"
          style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }}
        />
        <span
          className="font-mono text-[10px] tracking-[0.18em] uppercase"
          style={{ color: colors.accentLight }}
        >
          {portfolioData.length} Projects
        </span>
      </div>
    </ScrollReveal>
  )
}

// ─── Floating ambient orb decorations ─────────────────────────────────────────
function AmbientOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Top-right glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          top: '-15%',
          right: '-10%',
          background: `radial-gradient(circle, ${colors.accentGlow} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          opacity: 0.35,
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Bottom-left glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: '-10%',
          left: '-8%',
          background: `radial-gradient(circle, rgba(59,122,255,0.18) 0%, transparent 70%)`,
          filter: 'blur(90px)',
          opacity: 0.4,
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.25, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  )
}

// ─── Play-state indicator (pulsing ring when video plays) ─────────────────────
function PlayRing({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-14 h-14 rounded-full border-2"
            style={{ borderColor: 'rgba(255,255,255,0.7)' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Corner index badge ────────────────────────────────────────────────────────
function IndexBadge({ index }: { index: number }) {
  return (
    <div
      className="absolute top-4 left-4 z-20 font-mono text-[10px] tracking-[0.16em] uppercase"
      style={{
        background: 'rgba(26,26,24,0.55)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: 'rgba(255,255,255,0.75)',
        padding: '4px 10px',
        borderRadius: 999,
      }}
    >
      {String(index + 1).padStart(2, '0')}
    </div>
  )
}

// ─── Featured badge (only for Tensor Mesh) ────────────────────────────────────
function FeaturedBadge() {
  return (
    <motion.div
      className="absolute top-4 right-4 z-20 flex items-center gap-1.5"
      style={{
        background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
        padding: '5px 12px',
        borderRadius: 999,
        boxShadow: `0 4px 20px ${colors.accentGlow}`,
      }}
      animate={{ boxShadow: [`0 4px 20px ${colors.accentGlow}`, `0 4px 30px rgba(59,122,255,0.5)`, `0 4px 20px ${colors.accentGlow}`] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"
        style={{ animationDuration: '1.2s' }}
      />
      <span className="font-mono text-[9px] tracking-[0.2em] text-white uppercase font-medium">
        Featured
      </span>
    </motion.div>
  )
}

// ─── Video card ────────────────────────────────────────────────────────────────
function VideoCard({
  item,
  index,
  isFeatured,
}: {
  item: PortfolioItem
  index: number
  isFeatured: boolean
}) {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useFramerInView(cardRef, { once: true, margin: '0px 0px -80px 0px' })
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Autoplay when in view
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isInView) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }, [isInView])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])
  const handleClick = useCallback(() => router.push(`/work/${item.id}`), [router, item.id])

  return (
    <motion.div
      ref={cardRef}
      id={`work-card-${item.id}`}
      className="relative overflow-hidden cursor-pointer group"
      role="link"
      tabIndex={0}
      aria-label={`View ${item.title} case study`}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      style={{
        borderRadius: isFeatured ? 24 : 20,
        border: '1px solid rgba(26,26,24,0.07)',
        boxShadow: '0 2px 8px rgba(26,26,24,0.05), 0 12px 40px rgba(26,26,24,0.04)',
        background: colors.surface,
      }}
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 48, scale: 0.97 }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        boxShadow: `0 8px 48px ${colors.accentGlow}, 0 2px 8px rgba(26,26,24,0.06)`,
        borderColor: `rgba(10,74,235,0.2)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video */}
      <div
        className="relative overflow-hidden w-full"
        style={{
          aspectRatio: isFeatured ? '16/9' : '4/3',
          background: colors.surface2,
        }}
      >
        <motion.video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="none"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          animate={{ scale: isHovered ? 1.035 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Soft vignette always visible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(26,26,24,0.45) 0%, transparent 50%)',
          }}
        />

        {/* Glassmorphism hover overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(14,14,12,0.88) 0%, rgba(14,14,12,0.55) 45%, transparent 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Inner glass pill */}
          <motion.div
            style={{
              background: 'rgba(20,20,18,0.5)',
              backdropFilter: 'blur(16px) saturate(160%)',
              WebkitBackdropFilter: 'blur(16px) saturate(160%)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 14,
              padding: '14px 18px',
            }}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 12, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="font-mono uppercase tracking-[0.14em] mb-1"
              style={{ fontSize: 10, color: colors.accentLight }}
            >
              {item.subtitle}
            </p>
            <h3
              className={`font-serif text-white leading-tight ${isFeatured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {item.title}
            </h3>
            <p
              className="font-sans font-light mt-2 leading-relaxed"
              style={{
                fontSize: isFeatured ? '0.875rem' : '0.8125rem',
                color: 'rgba(255,255,255,0.72)',
                display: '-webkit-box',
                WebkitLineClamp: isFeatured ? 3 : 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {item.description}
            </p>

            {/* View arrow */}
            <div className="flex items-center gap-2 mt-3">
              <span
                className="font-mono text-[10px] tracking-[0.16em] uppercase"
                style={{ color: colors.accentLight }}
              >
                View Project
              </span>
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke={colors.accentLight}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ x: isHovered ? 3 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M2 7h10M8 3l4 4-4 4" />
              </motion.svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Badges */}
        {isFeatured && <FeaturedBadge />}
        <PlayRing visible={isPlaying && !isHovered} />
      </div>

      {/* Below-video card meta (subtle, visible when NOT hovered) */}
      <motion.div
        className="px-5 py-4"
        animate={{ opacity: isHovered ? 0.3 : 1 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-sans font-medium text-carbon text-sm leading-none mb-1">
              {item.title}
            </p>
            <p className="font-mono text-[11px] tracking-wide uppercase" style={{ color: colors.graphite }}>
              {item.subtitle}
            </p>
          </div>
          {/* Thin accent line */}
          <motion.div
            className="h-5 w-px ml-4"
            style={{ background: `linear-gradient(to bottom, transparent, ${colors.accent}, transparent)` }}
            animate={{ opacity: isHovered ? 0 : 0.6 }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Horizontal scroll progress strip ─────────────────────────────────────────
function ScrollProgressStrip() {
  const stripRef = useRef<HTMLDivElement>(null)
  const isInView = useFramerInView(stripRef, { once: false, margin: '0px' })

  return (
    <div ref={stripRef} className="flex items-center gap-3 mt-16" aria-hidden>
      {portfolioData.map((item, i) => (
        <motion.div
          key={item.id}
          className="h-0.5 rounded-full"
          style={{ background: item.featured ? colors.accent : colors.warmGrey }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: isInView ? 1 : 0 }}
          transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          custom={i}
        >
          <div
            style={{
              width: item.featured ? 64 : 32,
              height: 2,
              borderRadius: 999,
              background: item.featured ? colors.accent : colors.warmGrey,
            }}
          />
        </motion.div>
      ))}
      <span className="label ml-2" style={{ color: colors.warmGrey }}>
        {portfolioData.length} works
      </span>
    </div>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────────
export default function WorkShowcase() {
  const featured = portfolioData.find((p) => p.featured)!
  const rest = portfolioData.filter((p) => !p.featured)

  return (
    <section
      id="work"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: colors.bg }}
      aria-label="Portfolio showcase"
    >
      {/* Ambient background orbs */}
      <AmbientOrbs />

      {/* Top section divider line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${colors.accent}40, transparent)`,
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Section Header ── */}
        <div className="mb-16 md:mb-20">
          <SectionLabel />

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <TextReveal
              text="Our Craft."
              tag="h2"
              className="text-section text-carbon"
            />

            <ScrollReveal delay={0.3} className="md:max-w-sm">
              <p
                className="font-sans font-light text-lg leading-relaxed"
                style={{ color: colors.graphite }}
              >
                Cinematic motion tailored for{' '}
                <span
                  className="font-medium"
                  style={{ color: colors.carbon }}
                >
                  high-ticket SaaS.
                </span>
              </p>
              {/* Subtle accent underline */}
              <div
                className="h-px mt-4 w-16"
                style={{
                  background: `linear-gradient(90deg, ${colors.accent}, transparent)`,
                }}
              />
            </ScrollReveal>
          </div>
        </div>

        {/* ── Asymmetric Bento Grid ──
          Mobile:  single column stack
          Desktop: 3-col bento —
          ┌────────────────────────────┬──────────────┐
          │  Featured (col-span 2)     │   Rest[0]    │  row-1
          ├────────────────┬───────────┴──────────────┤
          │   Rest[1]      │   Rest[2] (col-span 2)   │  row-2
          └────────────────┴──────────────────────────┘
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* Featured card — col-span 2, row-span 1 */}
          <div className="md:col-span-2">
            <VideoCard
              item={featured}
              index={portfolioData.indexOf(featured)}
              isFeatured={true}
            />
          </div>

          {/* Rest[0] — right 1-col, same row as featured */}
          <div className="md:col-span-1">
            <VideoCard
              item={rest[0]}
              index={portfolioData.indexOf(rest[0])}
              isFeatured={false}
            />
          </div>

          {/* Rest[1] — 1 col, second row */}
          <div className="md:col-span-1">
            <VideoCard
              item={rest[1]}
              index={portfolioData.indexOf(rest[1])}
              isFeatured={false}
            />
          </div>

          {/* Rest[2] — 2 cols, second row (wider counterbalance) */}
          <div className="md:col-span-2">
            <VideoCard
              item={rest[2]}
              index={portfolioData.indexOf(rest[2])}
              isFeatured={false}
            />
          </div>
        </div>

        {/* ── Bottom progress strip + CTA row ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-16 pt-12 border-t border-border">
          <ScrollProgressStrip />

          <ScrollReveal delay={0.4}>
            <Link
              href="/work"
              className="group flex items-center gap-3 font-sans font-medium text-sm"
              style={{ color: colors.accent }}
              aria-label="View all case studies"
            >
              <motion.span
                className="tracking-wide"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                View all case studies
              </motion.span>
              <motion.div
                className="flex items-center justify-center w-8 h-8 rounded-full border"
                style={{ borderColor: `${colors.accent}40`, background: colors.accentSubtle }}
                whileHover={{ background: colors.accent, borderColor: colors.accent }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </motion.div>
            </Link>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom section divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.accent}30, transparent)`,
        }}
        aria-hidden
      />
    </section>
  )
}
