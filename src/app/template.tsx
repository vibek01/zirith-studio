'use client'

import { motion } from 'framer-motion'

/**
 * template.tsx — Next.js App Router re-creates this component on every navigation.
 * Unlike layout.tsx which persists, template.tsx gives us a fresh mount for
 * AnimatePresence-style entry/exit transitions on every page change.
 *
 * Strategy:
 * - Enter: page slides up subtly from y:20 with a fade (elegant, non-distracting)
 * - Exit: handled by the outgoing template unmounting naturally
 * - The curtain overlay slides down then up to mask the swap
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Page curtain — slides down covering old page, then reveals new one */}
      <motion.div
        className="fixed inset-0 z-[90] pointer-events-none"
        style={{ background: '#E8EFF5', originY: 0 }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
      />

      {/* Page content — fades and slides up into view */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        {children}
      </motion.div>
    </>
  )
}
