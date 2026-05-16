'use client'

import { TRUST_LOGOS } from '@/lib/constants'

// Wordmark SVG logos rendered as styled text — replace with actual SVG assets in production
function LogoMark({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center px-6 py-2 select-none">
      <span
        className="font-sans font-medium text-warm-grey grayscale transition-all duration-300 hover:text-graphite whitespace-nowrap"
        style={{
          fontSize: '15px',
          letterSpacing: '0.02em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {name}
      </span>
    </div>
  )
}

export default function TrustMarquee() {
  const doubled = [...TRUST_LOGOS, ...TRUST_LOGOS]

  return (
    <section id="trust" className="py-14 border-y border-border bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="label text-center text-warm-grey">
          Trusted by teams at
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        {/* First track */}
        <div className="flex animate-marquee">
          {doubled.map((logo, i) => (
            <LogoMark key={`a-${i}`} name={logo.name} />
          ))}
        </div>
        {/* Second track (seamless loop) */}
        <div className="flex animate-marquee2 absolute top-0 left-0">
          {doubled.map((logo, i) => (
            <LogoMark key={`b-${i}`} name={logo.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
