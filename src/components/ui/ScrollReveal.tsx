'use client'

import { motion, Variants } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import clsx from 'clsx'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  once?: boolean
}

const variants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (custom: { delay: number; duration: number; y: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom.delay,
      duration: custom.duration,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  y = 32,
  once = true,
}: ScrollRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1, once })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={{ delay, duration, y }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
