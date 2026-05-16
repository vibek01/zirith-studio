'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECT_TYPES, BUDGET_OPTIONS, BOOKING_TIME_SLOTS } from '@/lib/constants'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const TOTAL_STEPS = 3

// Generate next 7 days for the calendar
function getWeekDays() {
  const days = []
  const today = new Date()
  for (let i = 1; i <= 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push(d)
  }
  return days
}

function formatDay(date: Date) {
  return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    selectedDay: '',
    selectedTime: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const weekDays = getWeekDays()

  // Trap focus and prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      // Reset on close
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', company: '', email: '', selectedDay: '', selectedTime: '' })
      }, 500)
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ESC key close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.selectedDay || !formData.selectedTime) {
      alert('Please fill out all required fields.')
      return
    }
    setSubmitted(true)
  }

  const inputClass = `
    w-full bg-surface-2 border border-border rounded-xl px-4 py-3
    font-sans text-sm text-carbon placeholder-warm-grey
    focus:outline-none focus:border-bronze/50 focus:ring-2 focus:ring-bronze/10
    transition-all duration-200
  `

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
              className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full flex items-center justify-center border border-border text-graphite hover:text-carbon hover:border-bronze/30 transition-all duration-200 bg-surface/50 backdrop-blur-md"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Left panel */}
            <div
              className="hidden md:flex flex-col justify-between w-[38%] p-10 flex-shrink-0"
              style={{
                background: 'linear-gradient(160deg, #1A1A18 0%, #2C2820 100%)',
                borderRight: '1px solid rgba(184,151,90,0.15)',
              }}
            >
              <div>
                <p className="font-serif text-2xl text-surface mb-1">ZIRITH</p>
                <p className="label text-surface/30 mb-12">Studio</p>
                <h3 className="font-serif text-3xl text-surface leading-tight mb-4">
                  Let&rsquo;s build something<br />
                  <span className="italic text-bronze">that converts.</span>
                </h3>
                <p className="font-sans font-light text-sm text-surface/60 leading-relaxed">
                  Book a 30-minute strategy call. We&rsquo;ll audit your current video presence and share exactly what we&rsquo;d do differently.
                </p>
              </div>

              {/* Testimonial */}
              <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-bronze text-sm">★</span>
                  ))}
                </div>
                <p className="font-serif-alt text-sm text-surface/80 leading-relaxed mb-4">
                  &ldquo;Within 2 weeks of our Zirith video going live, demo requests tripled.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-bronze/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-champagne font-sans">SK</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-surface/80 font-sans">Sarah K.</p>
                    <p className="text-xs text-surface/40 font-sans">Head of Growth, Loom</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right panel — form */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 flex flex-col scrollbar-hide">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-bronze/10 border border-bronze/30 flex items-center justify-center mb-6">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B8975A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <h3 className="font-serif text-3xl text-carbon mb-3">You&rsquo;re booked.</h3>
                  <p className="font-sans font-light text-base text-graphite mb-8 max-w-sm">
                    Confirmation sent to <strong className="font-medium text-carbon">{formData.email}</strong>. We&rsquo;ll see you on {formData.selectedDay} at {formData.selectedTime}.
                  </p>
                  <button
                    onClick={onClose}
                    className="font-sans text-sm text-bronze hover:text-bronze-dark transition-colors duration-200"
                  >
                    Close window ↗
                  </button>
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <h3 className="font-serif text-2xl text-carbon mb-2">Book your slot</h3>
                  <p className="font-sans font-light text-sm text-graphite mb-8">
                    Let&rsquo;s get acquainted. All times in IST.
                  </p>

                  <div className="flex-1 flex flex-col gap-6">
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label mb-1.5 block">Full name *</label>
                        <input
                          type="text"
                          placeholder="Alex Chen"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="label mb-1.5 block">Company</label>
                        <input
                          type="text"
                          placeholder="Acme SaaS Inc."
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="label mb-1.5 block">Work email *</label>
                        <input
                          type="email"
                          placeholder="alex@acme.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="h-px bg-border my-2 w-full" />

                    {/* Day selector */}
                    <div>
                      <label className="label mb-3 block">Select day *</label>
                      <div className="flex flex-wrap gap-2">
                        {weekDays.map((day) => {
                          const label = formatDay(day)
                          return (
                            <button
                              key={label}
                              onClick={() => setFormData({ ...formData, selectedDay: label, selectedTime: '' })}
                              className={`
                                flex-1 min-w-[80px] py-2.5 rounded-xl border text-xs font-sans transition-all duration-200 text-center
                                ${formData.selectedDay === label
                                  ? 'border-bronze text-carbon font-medium'
                                  : 'border-border bg-surface-2 text-graphite hover:border-bronze/20'
                                }
                              `}
                              style={formData.selectedDay === label ? { background: 'rgba(184,151,90,0.08)', borderColor: '#B8975A' } : {}}
                            >
                              {label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Time slots */}
                    <div className={`transition-all duration-300 ${formData.selectedDay ? 'opacity-100 h-auto' : 'opacity-50 pointer-events-none'}`}>
                      <label className="label mb-3 block">Available times *</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {BOOKING_TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setFormData({ ...formData, selectedTime: slot })}
                            className={`
                              py-2.5 rounded-xl border text-xs font-sans transition-all duration-200
                              ${formData.selectedTime === slot
                                ? 'text-carbon font-medium'
                                : 'border-border bg-surface-2 text-graphite hover:border-bronze/20'
                              }
                            `}
                            style={formData.selectedTime === slot ? { background: 'rgba(184,151,90,0.08)', borderColor: '#B8975A' } : {}}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-8 mt-auto sticky bottom-0 bg-[#FAFAF8] pb-2">
                    <motion.button
                      onClick={handleSubmit}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-2xl font-sans font-medium text-sm text-surface transition-all duration-200"
                      style={{
                        background: 'linear-gradient(135deg, #B8975A 0%, #D4B880 100%)',
                        boxShadow: '0 4px 20px rgba(184,151,90,0.3)',
                      }}
                    >
                      Book Strategy Call →
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
