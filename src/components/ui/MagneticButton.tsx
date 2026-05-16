'use client'

import { motion, MotionValue } from 'framer-motion'
import { useMagnetic } from '@/hooks/useMagnetic'
import clsx from 'clsx'

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'bronze' | 'outline' | 'ghost'
  className?: string
  id?: string
}

export default function MagneticButton({
  children,
  onClick,
  variant = 'outline',
  className,
  id,
}: MagneticButtonProps) {
  const { ref, x, y, onMouseLeave } = useMagnetic(0.3, 100)

  return (
    <motion.button
      id={id}
      ref={ref as React.RefObject<HTMLButtonElement>}
      style={{ x, y }}
      onMouseLeave={onMouseLeave}
      onClick={(e) => onClick?.(e)}
      whileTap={{ scale: 0.97 }}
      className={clsx(
        'relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full',
        'font-sans font-medium text-sm tracking-wide',
        'transition-all duration-300 cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/50',
        {
          'bg-bronze text-surface hover:bg-bronze-dark shadow-lg shadow-bronze/20':
            variant === 'bronze',
          'border border-bronze/40 text-bronze hover:border-bronze hover:bg-bronze/5 backdrop-blur-sm':
            variant === 'outline',
          'text-carbon hover:text-bronze':
            variant === 'ghost',
        },
        className
      )}
    >
      {children}
      <motion.span
        className="inline-block"
        initial={{ x: 0 }}
        whileHover={{ x: 3 }}
        transition={{ duration: 0.2 }}
      >
        →
      </motion.span>
    </motion.button>
  )
}
