'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import MagneticButton from '@/components/ui/MagneticButton'

const PrismScene = dynamic(() => import('@/components/three/PrismScene'), {
  ssr: false,
  loading: () => null,
})

interface HeroProps {
  onBookingOpen: () => void
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero({ onBookingOpen }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, clicked: false })
  const [scrolled, setScrolled] = useState(false)
  const [ripple, setRipple] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2
  }, [])

  const handleClick = useCallback(() => {
    mouseRef.current.clicked = true
    setRipple(true)
    setTimeout(() => {
      mouseRef.current.clicked = false
      setRipple(false)
    }, 120)
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg cursor-crosshair"
    >
      {/* ── 3D Canvas — full background, no pointer events ────────────── */}
      <div
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      >
        <PrismScene mouseRef={mouseRef} />
      </div>

      {/* ── Gradient mask — fades left edge so text is readable ──────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(100deg, rgba(245,244,240,0.97) 0%, rgba(245,244,240,0.88) 38%, rgba(245,244,240,0.45) 62%, transparent 80%)',
        }}
      />

      {/* ── Subtle top/bottom vignette ────────────────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(245,244,240,0.6) 0%, transparent 20%, transparent 80%, rgba(245,244,240,0.6) 100%)',
        }}
      />

      {/* ── Massive Brand Watermark ─────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden mix-blend-multiply">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
          animate={{ opacity: 0.09, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[28vw] md:text-[22vw] leading-none text-carbon whitespace-nowrap tracking-tighter"
        >
          ZIRITH
        </motion.h1>
      </div>

      {/* ── Hero content ──────────────────────────────────────────────── */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-28 pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-[580px]"
          style={{ pointerEvents: 'auto' }}
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="mb-8">
            <span className="label">
              Elite Motion Studio
              <span className="inline-block ml-3 w-8 h-px bg-bronze align-middle" />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-hero text-carbon font-serif mb-6"
          >
            Motion that
            <br />
            <em className="not-italic italic" style={{ color: '#1A1A18' }}>
              converts.
            </em>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="font-sans font-light text-lg md:text-xl text-graphite leading-relaxed mb-10 max-w-[460px]"
          >
            We engineer SaaS explainers and VSLs that don&rsquo;t just
            explain&mdash;they compel.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-4"
            style={{ pointerEvents: 'auto' }}
          >
            <MagneticButton
              id="hero-cta-primary"
              variant="bronze"
              onClick={(e) => {
                e?.stopPropagation()
                onBookingOpen()
              }}
            >
              Book a Slot
            </MagneticButton>
            <a
              href="#bento"
              onClick={(e) => e.stopPropagation()}
              className="font-sans text-sm text-graphite hover:text-carbon transition-colors duration-200 inline-flex items-center gap-2 group"
            >
              See our impact
              <span className="w-4 h-px bg-graphite group-hover:w-6 group-hover:bg-carbon transition-all duration-300" />
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={item}
            className="mt-14 flex items-center gap-4 text-sm text-warm-grey font-sans"
          >
            <div className="flex -space-x-2">
              {['#C4A882', '#8A7A6E', '#A09080', '#D4B880'].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-bg"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p>
              Trusted by{' '}
              <span className="text-carbon font-medium">40+ SaaS teams</span>
            </p>
          </motion.div>

          {/* Click hint */}
          <motion.p
            variants={item}
            className="mt-6 font-sans text-xs text-warm-grey/70"
            style={{ letterSpacing: '0.08em' }}
          >
            ✦ Click anywhere to interact
          </motion.p>
        </motion.div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────── */}
      <motion.div
        animate={scrolled ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
      >
        <span className="label text-warm-grey" style={{ fontSize: '10px' }}>
          Scroll
        </span>
        <div className="relative h-10 w-px bg-border">
          <motion.div
            className="absolute top-0 left-0 w-full bg-bronze"
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.5 }}
          />
        </div>
      </motion.div>
    </section>
  )
}
