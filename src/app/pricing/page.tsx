'use client'

import { useState } from 'react'
import Navbar from '@/components/sections/Navbar'
import Investment from '@/components/sections/Investment'
import Footer from '@/components/sections/Footer'
import FloatingCTA from '@/components/ui/FloatingCTA'
import BookingModal from '@/components/ui/BookingModal'

export default function PricingPage() {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <main className="min-h-screen">
      <Navbar onBookingOpen={openModal} />
      <div className="pt-20">
        <Investment onBookingOpen={openModal} />
      </div>
      <Footer onBookingOpen={openModal} />

      <FloatingCTA onOpen={openModal} isModalOpen={modalOpen} />
      <BookingModal isOpen={modalOpen} onClose={closeModal} />
    </main>
  )
}
