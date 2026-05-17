'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextReveal from '@/components/ui/TextReveal'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { VALUE_PILLARS } from '@/lib/constants'
import { colors } from '@/lib/colors'

// --- Visual 1: Behavioral Pacing ---
// A timeline where nodes pulse sequentially, showing engineered rhythm.
function VisualBehavioralPacing() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-3/4 h-px bg-graphite/20" />
      <div className="flex justify-between w-3/4 z-10">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full bg-surface-2"
            style={{ border: `2px solid ${colors.accent}` }}
            animate={{
              scale: [1, 1.5, 1],
              backgroundColor: [colors.surface2, colors.accentLight, colors.surface2],
              boxShadow: ['0 0 0px transparent', `0 0 20px ${colors.accentGlow}`, '0 0 0px transparent'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <motion.div
        className="absolute top-1/2 left-[12.5%] w-12 h-12 rounded-full border border-accent/40"
        style={{ x: '-50%', y: '-50%' }}
        animate={{
          left: ['12.5%', '87.5%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

// --- Visual 2: Motion as Clarity ---
// Chaotic shapes that smoothly align into a single sharp focal point.
function VisualMotionAsClarity() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-24 h-24 border-2 rounded-xl mix-blend-multiply"
          style={{ borderColor: i === 0 ? colors.accent : i === 1 ? colors.accentLight : colors.graphite }}
          animate={{
            rotate: [i * 45, 0, i * 45],
            x: [i === 1 ? -40 : i === 2 ? 40 : 0, 0, i === 1 ? -40 : i === 2 ? 40 : 0],
            y: [i === 1 ? 40 : i === 2 ? -40 : -40, 0, i === 1 ? 40 : i === 2 ? -40 : -40],
            borderRadius: ['20%', '50%', '20%'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-accent"
        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.5, 1] }}
      />
    </div>
  )
}

// --- Visual 3: Conversion Architecture ---
// A glowing particle navigates a structured path down to a CTA button.
function VisualConversionArchitecture() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Wireframe structure */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
        <path
          d="M 200 40 L 200 120 L 120 120 L 120 200 L 200 200 L 200 240"
          stroke={colors.graphite}
          strokeWidth="2"
          strokeOpacity="0.2"
          strokeLinejoin="round"
        />
        <motion.path
          d="M 200 40 L 200 120 L 120 120 L 120 200 L 200 200 L 200 240"
          stroke={colors.accent}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      {/* Target CTA */}
      <motion.div
        className="absolute bottom-[30px] w-24 h-8 rounded-full flex items-center justify-center border"
        style={{ borderColor: colors.accent, backgroundColor: colors.accentSubtle }}
        animate={{
          scale: [1, 1, 1.1, 1],
          backgroundColor: [colors.accentSubtle, colors.accentSubtle, colors.accent, colors.accentSubtle],
          color: [colors.accent, colors.accent, colors.white, colors.accent],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] font-sans font-medium uppercase tracking-widest">Action</span>
      </motion.div>
    </div>
  )
}

const VISUALS = [
  <VisualBehavioralPacing key="0" />,
  <VisualMotionAsClarity key="1" />,
  <VisualConversionArchitecture key="2" />,
]

export default function ValueProp() {
  const [activeIndex, setActiveIndex] = useState<number>(0)

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

        {/* Interactive Split-Screen Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* Left Column: Interactive Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {VALUE_PILLARS.map((pillar, i) => {
              const isActive = activeIndex === i
              return (
                <ScrollReveal key={pillar.number} delay={i * 0.1}>
                  <button
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className="w-full text-left group relative p-6 rounded-2xl transition-all duration-300"
                    style={{
                      background: isActive ? colors.white : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(26,26,24,0.05)' : 'transparent'}`,
                      boxShadow: isActive ? '0 4px 24px rgba(26,26,24,0.03)' : 'none',
                    }}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <motion.span
                        className="font-mono text-xs font-medium"
                        animate={{ color: isActive ? colors.accent : colors.warmGrey }}
                      >
                        {pillar.number}
                      </motion.span>
                      <motion.h3
                        className="font-serif-alt text-xl md:text-2xl"
                        animate={{ color: isActive ? colors.carbon : colors.graphite }}
                      >
                        {pillar.title}
                      </motion.h3>
                    </div>

                    {/* Expandable Body */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="font-sans font-light text-base text-graphite leading-relaxed pt-2 pl-8">
                            {pillar.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Progress indicator line on active tab */}
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-r-full"
                        style={{ background: colors.accent }}
                        layoutId="activeTabIndicator"
                      />
                    )}
                  </button>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Right Column: Glassmorphism Visual Canvas */}
          <div className="lg:col-span-7 h-[300px] md:h-[450px]">
            <ScrollReveal delay={0.3} className="h-full">
              <div
                className="relative w-full h-full rounded-3xl overflow-hidden glass-card flex items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 100%)',
                  boxShadow: `0 20px 40px ${colors.accentSubtle}, inset 0 1px 0 rgba(255,255,255,0.8)`
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {VISUALS[activeIndex]}
                  </motion.div>
                </AnimatePresence>

                {/* Subtle overlay gradient to frame it */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, transparent 40%, ${colors.surface} 120%)` }}
                />
              </div>
            </ScrollReveal>
          </div>

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
