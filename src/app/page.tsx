'use client'

import { useState } from 'react'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import BentoGrid from '@/components/sections/BentoGrid'
import WorkShowcase from '@/components/sections/WorkShowcase'
import Footer from '@/components/sections/Footer'
import FloatingCTA from '@/components/ui/FloatingCTA'
import BookingModal from '@/components/ui/BookingModal'

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <main>
      <Navbar onBookingOpen={openModal} />
      <Hero onBookingOpen={openModal} />
      <WorkShowcase />
      <BentoGrid />
      <Footer onBookingOpen={openModal} />

      {/* Floating CTA — appears after scrolling */}
      <FloatingCTA onOpen={openModal} isModalOpen={modalOpen} />

      {/* Booking Modal */}
      <BookingModal isOpen={modalOpen} onClose={closeModal} />
    </main>
  )
}
