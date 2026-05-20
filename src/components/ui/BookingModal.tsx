'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Cal, { getCalApi } from '@calcom/embed-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // Trap focus and prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Initialize Cal.com configurations
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: {
          branding: {
            brandColor: "#0A4AEB", // Zirith Blue brand color
          },
        },
        hideEventTypeDetails: true,
        showTimezoneWhenEventDetailsHidden: true,
      });
    })();
  }, []);

  // ESC key close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-carbon/30 backdrop-blur-sm"
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            layoutId="booking-pill"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 inset-y-4 md:inset-x-8 md:inset-y-8 z-50 rounded-3xl overflow-hidden flex"
            style={{
              background: '#FAFAF8',
              boxShadow: '0 32px 80px rgba(26,26,24,0.2)',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full flex items-center justify-center border border-border text-graphite hover:text-carbon hover:border-accent/30 transition-all duration-200 bg-surface/50 backdrop-blur-md"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Left panel */}
            <div
              className="hidden md:flex flex-col justify-center items-center text-center w-[38%] p-10 flex-shrink-0"
              style={{
                background: 'linear-gradient(160deg, #1A1A18 0%, #2C2820 100%)',
                borderRight: '1px solid rgba(10, 74, 235, 0.15)',
              }}
            >
              <div className="max-w-[280px] flex flex-col items-center">
                <p className="font-serif text-5xl text-surface mb-2 tracking-wide">ZIRITH</p>
                <p className="label text-accent font-medium text-xs tracking-widest mb-12 uppercase">STUDIO</p>
                <h3 className="font-serif text-3xl text-surface leading-tight mb-4">
                  Let&rsquo;s build something<br />
                  <span className="italic text-accent">that converts.</span>
                </h3>
                <p className="font-sans font-light text-sm text-surface/60 leading-relaxed">
                  Book a 30-minute strategy call. We&rsquo;ll audit your current video presence and share exactly what we&rsquo;d do differently.
                </p>
              </div>
            </div>

            {/* Right panel — Cal.com Embed */}
            <div className="flex-1 flex flex-col bg-[#FAFAF8] relative overflow-hidden">
              <div className="w-full h-full min-h-[500px] flex-1 overflow-y-auto scrollbar-hide pt-12 md:pt-8">
                <Cal
                  calLink="zirith-studio/30min"
                  style={{ width: '100%', height: '100%', minHeight: '580px', border: 'none' }}
                  config={{ 
                    layout: 'month_view',
                    theme: 'light'
                  }}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
