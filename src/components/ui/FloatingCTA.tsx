'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMagnetic } from '@/hooks/useMagnetic'

interface FloatingCTAProps {
  onOpen: () => void
  isModalOpen: boolean
}

export default function FloatingCTA({ onOpen, isModalOpen }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false)
  const { ref, x, y, onMouseLeave } = useMagnetic(0.28, 110)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && !isModalOpen && (
        <motion.div
          className="fixed bottom-8 right-8 z-40 no-print"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            id="floating-cta"
            ref={ref as React.RefObject<HTMLButtonElement>}
            layoutId="booking-pill"
            onMouseLeave={onMouseLeave}
            onClick={onOpen}
            whileTap={{ scale: 0.95 }}
            className="
              group relative flex items-center gap-3 px-6 py-3.5 rounded-full
              cursor-pointer select-none outline-none
            "
            style={{
              x, y,
              background: 'rgba(250,250,248,0.8)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(184,151,90,0.35)',
              boxShadow: '0 8px 32px rgba(26,26,24,0.12), 0 2px 8px rgba(184,151,90,0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
            } as any}
          >
            {/* Pulse dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bronze opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-bronze" />
            </span>

            <span
              className="font-sans font-medium text-sm"
              style={{ color: '#1A1A18', letterSpacing: '0.01em' }}
            >
              Book a Slot
            </span>

            <motion.span
              className="font-sans text-sm text-bronze"
              initial={{ x: 0 }}
              whileHover={{ x: 2 }}
              transition={{ duration: 0.15 }}
            >
              →
            </motion.span>

            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{
                background: 'radial-gradient(ellipse at center, rgba(184,151,90,0.08) 0%, transparent 70%)',
              }}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
