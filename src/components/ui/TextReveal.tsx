'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

/**
 * TextReveal — splits text into lines and slides each line up from a clip mask.
 * Creates the "Apple-style" word reveal effect.
 */
export default function TextReveal({
  text,
  className,
  delay = 0,
  tag: Tag = 'h2',
}: TextRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2, once: true })

  const words = text.split(' ')

  return (
    <div ref={ref} className={className}>
      <Tag style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.28em', lineHeight: 'inherit' }}>
        {words.map((word, i) => (
          <span
            key={i}
            style={{ overflow: 'hidden', display: 'inline-block', paddingBottom: '0.1em' }}
          >
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{
                duration: 0.85,
                delay: delay + i * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  )
}
