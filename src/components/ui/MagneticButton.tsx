'use client'

import { motion, MotionValue } from 'framer-motion'
import { useMagnetic } from '@/hooks/useMagnetic'
import clsx from 'clsx'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'accent' | 'outline' | 'ghost'
}

export default function MagneticButton({
  children,
  onClick,
  variant = 'outline',
  className,
  id,
  ...rest
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
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
        {
          'bg-accent text-surface hover:bg-accent-dark shadow-lg shadow-accent/20':
            variant === 'accent',
          'border border-accent/40 text-accent hover:border-accent hover:bg-accent/5 backdrop-blur-sm':
            variant === 'outline',
          'text-carbon hover:text-accent':
            variant === 'ghost',
        },
        className
      )}
      {...rest}
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
