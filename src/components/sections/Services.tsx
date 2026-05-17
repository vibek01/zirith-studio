'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextReveal from '@/components/ui/TextReveal'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { SERVICES } from '@/lib/constants'
import { colors } from '@/lib/colors'

const serviceIcons = [
  // Monitor play icon
  <svg key="0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="m10 8 4 3-4 3V8z"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>,
  // Megaphone icon
  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11V7a1 1 0 0 1 1.4-.9l11 4.7a1 1 0 0 1 0 1.4l-11 4.7A1 1 0 0 1 3 16v-4"/><path d="M11.2 12H21"/><path d="M5 16v3"/></svg>,
  // TrendingUp icon
  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  // Layers icon
  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
]

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="services" className="py-28 md:py-36 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <ScrollReveal>
            <span className="label mb-4 block">What We Build</span>
          </ScrollReveal>
          <TextReveal
            text="What we build."
            tag="h2"
            className="text-section text-carbon"
          />
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.number} delay={i * 0.08}>
              <motion.article
                className="relative rounded-2xl p-8 border cursor-default overflow-hidden"
                style={{
                  borderColor: hoveredIndex === i
                    ? colors.accentGlow
                    : 'rgba(26,26,24,0.07)',
                  background: hoveredIndex === i
                    ? colors.gradientCard
                    : colors.white,
                  boxShadow: hoveredIndex === i
                    ? `0 4px 32px ${colors.accentGlow}`
                    : '0 1px 3px rgba(26,26,24,0.04)',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Tag */}
                {service.tag && (
                  <span
                    className="absolute top-6 right-6 font-sans text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: colors.accentSubtle,
                      color: colors.accent,
                      border: `1px solid ${colors.accentSubtle}`,
                    }}
                  >
                    {service.tag}
                  </span>
                )}

                {/* Icon */}
                <motion.div
                  className="mb-6 text-graphite"
                  animate={{ color: hoveredIndex === i ? colors.accent : colors.graphite }}
                  transition={{ duration: 0.2 }}
                >
                  {serviceIcons[i]}
                </motion.div>

                {/* Number + Title */}
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-xs text-warm-grey">{service.number}</span>
                  <h3 className="font-serif-alt text-xl font-medium text-carbon">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-sans font-light text-base text-graphite leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Arrow CTA */}
                <motion.div
                  className="flex items-center gap-2 font-sans text-sm font-medium"
                  style={{ color: colors.accent }}
                >
                  <span>Learn more</span>
                  <motion.span
                    animate={{ x: hoveredIndex === i ? 4 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </motion.div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 origin-left"
                  style={{ background: colors.gradientButtonHover }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
