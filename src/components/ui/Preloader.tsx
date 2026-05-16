'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Scroll lock while loading
    document.body.style.overflow = 'hidden'

    // Simulate loading progress
    const duration = 1200 // 1.2 seconds total load
    const interval = 20
    let current = 0

    const timer = setInterval(() => {
      current += interval
      const rawProgress = (current / duration) * 100
      // Ease out the progress (slow down at the end)
      const easedProgress = Math.min(100, Math.floor(rawProgress + Math.sin(rawProgress * Math.PI / 200) * 10))
      
      setProgress(easedProgress > 100 ? 100 : easedProgress)

      if (current >= duration) {
        clearInterval(timer)
        setTimeout(() => {
          setIsLoading(false)
          document.body.style.overflow = ''
        }, 400) // Brief pause at 100% before sliding up
      }
    }, interval)

    return () => {
      clearInterval(timer)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-carbon text-bg selection:bg-transparent"
        >
          <div className="relative flex flex-col items-center justify-center h-full w-full">
            {/* The Percentage Counter */}
            <div className="absolute right-8 bottom-8 md:right-16 md:bottom-16 overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-5xl md:text-8xl tracking-tighter"
              >
                {progress}%
              </motion.div>
            </div>

            {/* The Brand Name Reveal */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%', rotate: 5, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="font-serif text-[15vw] md:text-[10vw] leading-none tracking-tighter text-bronze"
              >
                ZIRITH
              </motion.h1>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden mt-4">
              <motion.p
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="font-sans text-sm md:text-base tracking-[0.2em] uppercase text-bg/60"
              >
                Elite Motion Studio
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
