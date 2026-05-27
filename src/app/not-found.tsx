'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { colors } from '@/lib/colors'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import MagneticButton from '@/components/ui/MagneticButton'
import BookingModal from '@/components/ui/BookingModal'

export default function NotFound() {
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <main className="min-h-screen flex flex-col" style={{ background: colors.bg }}>
      <Navbar onBookingOpen={openModal} />
      
      <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-[120px] md:text-[180px] leading-none text-carbon mb-2 tracking-tighter">404</h1>
          <p className="label text-accent mb-6 block uppercase tracking-widest">Page Not Found</p>
          <p className="font-sans text-graphite text-lg max-w-md mx-auto mb-10">
            We couldn&apos;t find the page you were looking for. It might have been moved or doesn&apos;t exist.
          </p>
          
          <MagneticButton variant="accent" onClick={() => router.push('/')}>
            Return to Homepage
          </MagneticButton>
        </motion.div>
      </div>

      <div className="mt-auto">
        <Footer onBookingOpen={openModal} />
      </div>
      <BookingModal isOpen={modalOpen} onClose={closeModal} />
    </main>
  )
}
