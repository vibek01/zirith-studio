'use client'

import { useState } from 'react'
import Navbar from '@/components/sections/Navbar'
import ValueProp from '@/components/sections/ValueProp'
import Services from '@/components/sections/Services'
import Footer from '@/components/sections/Footer'
import FloatingCTA from '@/components/ui/FloatingCTA'
import BookingModal from '@/components/ui/BookingModal'

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <main className="min-h-screen">
      <Navbar onBookingOpen={openModal} />
      <div className="pt-20">
        <ValueProp />
        <Services />
      </div>
      <Footer onBookingOpen={openModal} />

      <FloatingCTA onOpen={openModal} isModalOpen={modalOpen} />
      <BookingModal isOpen={modalOpen} onClose={closeModal} />
    </main>
  )
}
