'use client'

import { useRef, useCallback, useEffect } from 'react'
import { useSpring } from 'framer-motion'

/**
 * useMagnetic — gives a DOM element a magnetic pull toward the cursor.
 * Returns a ref to attach to the element and handlers to spread onto it.
 */
export function useMagnetic(strength = 0.35, radius = 120) {
  const ref = useRef<HTMLElement | null>(null)

  const x = useSpring(0, { stiffness: 200, damping: 18, mass: 0.6 })
  const y = useSpring(0, { stiffness: 200, damping: 18, mass: 0.6 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < radius) {
        x.set(dx * strength)
        y.set(dy * strength)
      } else {
        x.set(0)
        y.set(0)
      }
    },
    [x, y, strength, radius]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return { ref, x, y, onMouseLeave: handleMouseLeave }
}
