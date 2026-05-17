'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Sparkles, ArrowRight, MessageSquare } from 'lucide-react'

interface InvestmentCardProps {
  tier: {
    eyebrow: string
    name: string
    price: string
    priceNote: string
    description: string
    bullets: string[]
    cta: string
    featured: boolean
    ctaVariant: 'outline' | 'solid' | 'ghost'
  }
  index: number
  onBookingOpen?: () => void
}

const TIERS = [
  {
    eyebrow: 'Tier 01',
    name: 'The Catalyst',
    price: 'From $300',
    priceNote: 'Single engagement',
    description: 'For SaaS startups who need one decisive, high-impact product video to unlock their next stage of growth.',
    bullets: [
      'One premium Hero VSL (60–120 sec)',
      'Full motion design & storyboarding',
      'Conversion-optimised script framework',
      'Two revision rounds included',
    ],
    cta: 'Book Discovery',
    featured: false,
    ctaVariant: 'outline' as const,
  },
  {
    eyebrow: 'Most Popular',
    name: 'The Campaign Suite',
    price: 'From $2,000',
    priceNote: 'Full funnel package',
    description: 'A complete visual overhaul of your conversion funnel — from the first impression to the signed contract.',
    bullets: [
      'Hero VSL + full funnel ad creatives',
      'Social-native short-form ad variants',
      'Onboarding & in-product animations',
      'Brand motion system & style guide',
      'Priority turnaround (2-week delivery)',
    ],
    cta: 'Secure a Meeting',
    featured: true,
    ctaVariant: 'solid' as const,
  },
  {
    eyebrow: 'Tier 03',
    name: 'Enterprise Motion Partner',
    price: 'Custom Engagement',
    priceNote: 'Ongoing retainer',
    description: 'For established SaaS teams who require a dedicated motion design partner embedded into their product workflow.',
    bullets: [
      'Dedicated motion design resource',
      'Scalable design system ownership',
      'Quarterly brand audits & strategy',
      'White-glove onboarding & SLA',
    ],
    cta: 'Talk to Leadership',
    featured: false,
    ctaVariant: 'ghost' as const,
  },
]

function InvestmentCard({ tier, index, onBookingOpen }: InvestmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      className="relative flex flex-col rounded-3xl overflow-hidden"
      style={
        tier.featured
          ? {
            background: 'rgba(242, 246, 250, 0.9)',
            border: '1px solid rgba(10, 74, 235, 0.25)',
            boxShadow: `
                0 0 0 1px rgba(10, 74, 235, 0.12),
                0 8px 48px rgba(10, 74, 235, 0.10),
                0 2px 8px rgba(10, 74, 235, 0.06),
                inset 0 1px 0 rgba(255, 255, 255, 0.9)
              `,
          }
          : {
            background: 'rgba(242, 246, 250, 0.55)',
            border: '1px solid rgba(26, 26, 24, 0.07)',
            boxShadow: '0 4px 24px rgba(26, 26, 24, 0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
          }
      }
    >
      {/* Featured blue glow bar */}
      {tier.featured && (
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(10,74,235,0.7) 40%, rgba(59,122,255,0.9) 60%, transparent)',
          }}
        />
      )}

      <div className="flex flex-col flex-1 p-8 md:p-10">
        {/* Header */}
        <div className="mb-8">
          {/* Eyebrow / Badge */}
          <div className="flex items-center gap-3 mb-5">
            {tier.featured ? (
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-semibold tracking-widest uppercase"
                style={{
                  background: 'rgba(10, 74, 235, 0.1)',
                  color: '#0A4AEB',
                  border: '1px solid rgba(10, 74, 235, 0.2)',
                }}
              >
                <Sparkles size={9} strokeWidth={2.5} />
                {tier.eyebrow}
              </span>
            ) : (
              <span className="label">{tier.eyebrow}</span>
            )}
          </div>

          {/* Tier Name */}
          <h3
            className="font-serif text-2xl md:text-3xl text-carbon leading-tight mb-3"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {tier.name}
          </h3>

          {/* Price */}
          <div className="mb-4">
            <p
              className="font-serif-alt text-3xl md:text-4xl font-medium text-carbon leading-none"
              style={{ letterSpacing: '-0.02em' }}
            >
              {tier.price}
            </p>
            <p className="font-sans text-xs text-warm-grey mt-1.5 tracking-wide">{tier.priceNote}</p>
          </div>

          {/* Divider */}
          <div
            className="h-px w-full"
            style={{
              background: tier.featured
                ? 'linear-gradient(90deg, rgba(10,74,235,0.15), rgba(10,74,235,0.04))'
                : 'rgba(26,26,24,0.06)',
            }}
          />
        </div>

        {/* Description */}
        <p className="font-sans font-light text-sm text-graphite leading-relaxed mb-8">
          {tier.description}
        </p>

        {/* Bullet list */}
        <ul className="flex flex-col gap-3.5 mb-10 flex-1">
          {tier.bullets.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                style={
                  tier.featured
                    ? { background: 'rgba(10,74,235,0.12)' }
                    : { background: 'rgba(26,26,24,0.06)' }
                }
              >
                <Check
                  size={9}
                  strokeWidth={2.8}
                  color={tier.featured ? '#0A4AEB' : '#6B6B66'}
                />
              </span>
              <span className="font-sans font-light text-sm text-carbon/80 leading-snug">{point}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <CTAButton variant={tier.ctaVariant} label={tier.cta} onClick={onBookingOpen} />
      </div>
    </motion.div>
  )
}

function CTAButton({
  variant,
  label,
  onClick,
}: {
  variant: 'outline' | 'solid' | 'ghost'
  label: string
  onClick?: () => void
}) {
  if (variant === 'solid') {
    return (
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.97 }}
        className="w-full py-3.5 rounded-2xl font-sans font-medium text-sm text-white flex items-center justify-center gap-2 transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #0A4AEB 0%, #3B7AFF 100%)',
          boxShadow: '0 4px 20px rgba(10,74,235,0.35)',
        }}
        whileHover={{
          boxShadow: '0 8px 32px rgba(10,74,235,0.45)',
          transition: { duration: 0.2 },
        }}
      >
        {label}
        <ArrowRight size={14} strokeWidth={2} />
      </motion.button>
    )
  }

  if (variant === 'outline') {
    return (
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.97 }}
        className="w-full py-3.5 rounded-2xl font-sans font-medium text-sm text-carbon flex items-center justify-center gap-2 transition-all duration-300"
        style={{
          border: '1px solid rgba(26,26,24,0.12)',
          background: 'rgba(255,255,255,0.5)',
        }}
        whileHover={{
          borderColor: 'rgba(10,74,235,0.3)',
          background: 'rgba(10,74,235,0.03)',
          transition: { duration: 0.2 },
        }}
      >
        {label}
        <ArrowRight size={14} strokeWidth={2} />
      </motion.button>
    )
  }

  // ghost
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className="w-full py-3.5 rounded-2xl font-sans font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300"
      style={{ color: '#0A4AEB' }}
      whileHover={{
        background: 'rgba(10,74,235,0.05)',
        transition: { duration: 0.2 },
      }}
    >
      <MessageSquare size={14} strokeWidth={2} />
      {label}
    </motion.button>
  )
}

interface InvestmentProps {
  onBookingOpen?: () => void
}

export default function Investment({ onBookingOpen }: InvestmentProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="investment"
      ref={sectionRef}
      className="py-28 md:py-40 overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="max-w-2xl mb-20">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="label mb-5 block"
          >
            Your Investment
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="text-section text-carbon font-serif-alt mb-6"
          >
            Engagements built for{' '}
            <span
              className="font-serif italic"
              style={{ color: 'var(--color-accent)' }}
            >
              outcomes,
            </span>{' '}
            not deliverables.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-light text-base text-graphite leading-relaxed"
          >
            We don&rsquo;t sell video packages. We engineer conversion moments. Every engagement
            is scoped around your growth stage and retention goals.
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          initial={false}
          animate={isInView ? {} : {}}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch"
        >
          {isInView &&
            TIERS.map((tier, i) => (
              <InvestmentCard
                key={tier.name}
                tier={tier}
                index={i}
                onBookingOpen={onBookingOpen}
              />
            ))}
        </motion.div>

        {/* Bottom trust note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
        >
          <p className="font-sans font-light text-xs text-warm-grey tracking-wide">
            All engagements begin with a no-obligation 30-min strategy call &mdash; no RFPs, no lengthy procurement.
          </p>
          <div className="hidden sm:block h-3 w-px bg-border" />
          <p className="font-sans font-light text-xs text-warm-grey tracking-wide">
            Limited to{' '}
            <span className="font-medium text-carbon">3 new clients per month</span>{' '}
            to preserve quality.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
