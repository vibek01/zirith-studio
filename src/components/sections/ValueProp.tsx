'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextReveal from '@/components/ui/TextReveal'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { VALUE_PILLARS } from '@/lib/constants'

export default function ValueProp() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="value-prop" className="py-28 md:py-40 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Large pull quote */}
        <div className="mb-24 md:mb-32 max-w-4xl">
          <ScrollReveal>
            <span className="label mb-6 block">Our Philosophy</span>
          </ScrollReveal>
          <TextReveal
            text="Most SaaS videos explain features. Ours engineer behavior."
            tag="h2"
            className="text-quote text-carbon font-serif italic"
            delay={0.05}
          />
        </div>

        {/* Creative Interactive Accordion */}
        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[400px]">
          {VALUE_PILLARS.map((pillar, i) => {
            const isHovered = hoveredIndex === i
            return (
              <motion.div
                key={pillar.number}
                onMouseEnter={() => setHoveredIndex(i)}
                onFocus={() => setHoveredIndex(i)}
                tabIndex={0}
                className="relative flex flex-col justify-between rounded-3xl p-8 cursor-pointer overflow-hidden border transition-colors duration-500"
                style={{
                  background: isHovered ? '#1A1A18' : 'rgba(235, 228, 216, 0.5)',
                  borderColor: isHovered ? 'rgba(184, 151, 90, 0.3)' : 'rgba(26, 26, 24, 0.05)',
                }}
                animate={{
                  flex: isHovered ? 3 : 1,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Background glow on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 z-0 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at 50% 0%, rgba(184,151,90,0.15) 0%, transparent 70%)',
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Top Section: Number */}
                <div className="z-10 mb-8 md:mb-0">
                  <motion.span
                    className="font-mono text-sm font-medium tracking-widest"
                    animate={{ color: isHovered ? '#D4B880' : '#B8975A' }}
                    transition={{ duration: 0.3 }}
                  >
                    {pillar.number}
                  </motion.span>
                </div>

                {/* Bottom Section: Text */}
                <div className="z-10 mt-auto flex flex-col justify-end h-full">
                  <motion.h3
                    className="font-serif-alt text-2xl md:text-3xl font-medium mb-4 transition-all duration-500"
                    animate={{
                      color: isHovered ? '#FAFAF8' : '#1A1A18',
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {pillar.title}
                  </motion.h3>

                  <AnimatePresence mode="wait">
                    {isHovered && (
                      <motion.p
                        initial={{ opacity: 0, y: 10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: 10, height: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="font-sans font-light text-base md:text-lg text-surface/80 leading-relaxed max-w-sm"
                      >
                        {pillar.body}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom stat row */}
        <div className="mt-24 border-t border-border pt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { stat: '40+', label: 'SaaS Clients' },
            { stat: '98%', label: 'Client Satisfaction' },
            { stat: '3.2×', label: 'Avg. Pipeline Lift' },
            { stat: '2wk', label: 'Avg. Turnaround' },
          ].map((item, i) => (
            <ScrollReveal key={item.stat} delay={i * 0.08}>
              <div>
                <p className="font-mono text-3xl md:text-4xl font-medium text-carbon mb-1">
                  {item.stat}
                </p>
                <p className="label">{item.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
