'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import MagneticButton from '@/components/ui/MagneticButton'

interface FooterProps {
  onBookingOpen: () => void
}

export default function Footer({ onBookingOpen }: FooterProps) {
  return (
    <footer className="bg-surface border-t border-border py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* CTA block */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <p className="label mb-4">Ready to convert?</p>
            <h2 className="font-serif text-4xl md:text-5xl text-carbon mb-8 leading-tight">
              Let&rsquo;s build something<br />
              <span className="italic text-accent">that compels.</span>
            </h2>
            <MagneticButton id="footer-cta" variant="accent" onClick={onBookingOpen}>
              Book a Strategy Slot
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Footer links */}
        <div className="border-t border-border pt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="font-serif text-xl text-carbon mb-2">ZIRITH</p>
            <p className="font-sans font-light text-sm text-graphite leading-relaxed max-w-[240px]">
              Elite motion studio for SaaS companies that need to convert.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <p className="label mb-1">Navigation</p>
            {['Work', 'Services', 'About', 'Pricing', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                className="font-sans text-sm text-graphite hover:text-carbon transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="label mb-1">Connect</p>
            {['LinkedIn', 'Twitter / X', 'Dribbble', 'Behance'].map((social) => (
              <a
                key={social}
                href="#"
                className="font-sans text-sm text-graphite hover:text-accent transition-colors duration-200 inline-flex items-center gap-2 group"
              >
                {social}
                <span className="w-3 h-px bg-graphite group-hover:w-5 group-hover:bg-accent transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-sans text-xs text-warm-grey">
            &copy; {new Date().getFullYear()} Zirith Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((link) => (
              <a
                key={link}
                href="#"
                className="font-sans text-xs text-warm-grey hover:text-graphite transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
