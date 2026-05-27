'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { colors } from '@/lib/colors'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import BookingModal from '@/components/ui/BookingModal'

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function PaymentPage() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [modalOpen, setModalOpen] = useState(false)

  const handlePayment = async (amountInDollars: number, tierId: string) => {
    if (amountInDollars <= 0) {
      alert("Please enter a valid amount.")
      return
    }

    setLoadingTier(tierId)
    
    const res = await loadRazorpayScript()
    if (!res) {
      alert('Razorpay SDK failed to load. Please check your connection.')
      setLoadingTier(null)
      return
    }

    // Amount in subunits (cents for USD)
    const amountInCents = amountInDollars * 100

    try {
      const orderResponse = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountInCents, currency: 'USD' }),
      })
      const orderData = await orderResponse.json()

      if (!orderData || !orderData.id) {
        alert('Failed to initialize payment order.')
        setLoadingTier(null)
        return
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Zirith Studio',
        description: `Payment for ${tierId}`,
        image: '/zirithLogo.jpeg',
        order_id: orderData.id,
        handler: function (response: any) {
          console.log('Payment Success:', response)
          alert(`Payment Successful! Your Payment ID is: ${response.razorpay_payment_id}`)
        },
        prefill: {
          name: '',
          email: '',
        },
        theme: { color: colors.accent },
        modal: {
          ondismiss: function() {
            setLoadingTier(null)
          }
        }
      }

      const paymentObject = new (window as any).Razorpay(options)
      
      paymentObject.on('payment.failed', function (response: any) {
        console.error('Payment Failed:', response.error)
        alert(`Payment Failed: ${response.error.description}`)
        setLoadingTier(null)
      })

      paymentObject.open()
    } catch (error) {
      console.error('Payment error:', error)
      alert('Something went wrong initiating the payment.')
      setLoadingTier(null)
    }
  }

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <main style={{ background: colors.bg, minHeight: '100vh' }}>
      <Navbar onBookingOpen={openModal} />
      
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="label text-accent mb-4 block">SECURE PAYMENT</span>
          <h1 className="text-5xl md:text-6xl font-serif text-carbon mb-6 tracking-tight">Complete your transaction.</h1>
          <p className="text-graphite font-sans text-lg max-w-2xl mx-auto">
            Select a payment tier or enter a custom amount for your project. Payments are securely processed via Razorpay in USD.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* Tier 1: $300 */}
          <motion.div 
            className="p-8 rounded-3xl flex flex-col items-center text-center relative overflow-hidden group"
            style={{ background: colors.surface, border: '1px solid rgba(26,26,24,0.07)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(26,26,24,0.08)' }}
          >
            <h3 className="font-serif text-2xl text-carbon mb-2">Deposit</h3>
            <p className="text-sm font-sans text-graphite mb-6">Initial project commitment fee</p>
            <div className="text-5xl font-serif text-carbon mb-8">$300 <span className="text-xl text-graphite">USD</span></div>
            <button
              onClick={() => handlePayment(300, 'Deposit ($300)')}
              disabled={loadingTier !== null}
              data-umami-event="Purchase ($300 Deposit)"
              className="w-full py-4 rounded-xl text-white font-medium transition-all"
              style={{ background: colors.carbon, opacity: loadingTier === 'Deposit ($300)' ? 0.7 : 1 }}
            >
              {loadingTier === 'Deposit ($300)' ? 'Processing...' : 'Pay Now'}
            </button>
          </motion.div>

          {/* Tier 2: $2000 */}
          <motion.div 
            className="p-8 rounded-3xl flex flex-col items-center text-center relative overflow-hidden group"
            style={{ background: colors.surface, border: `2px solid ${colors.accent}`, boxShadow: `0 10px 30px ${colors.accentGlow}` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: `0 20px 50px ${colors.accentGlow}` }}
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-accent" />
            <span className="absolute top-4 right-4 bg-accent/10 text-accent text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-widest">Popular</span>
            
            <h3 className="font-serif text-2xl text-carbon mb-2 mt-4">Standard Project</h3>
            <p className="text-sm font-sans text-graphite mb-6">Full explainer video production</p>
            <div className="text-5xl font-serif text-carbon mb-8">$2,000 <span className="text-xl text-graphite">USD</span></div>
            <button
              onClick={() => handlePayment(2000, 'Standard Project ($2000)')}
              disabled={loadingTier !== null}
              data-umami-event="Purchase ($2000 Standard)"
              className="w-full py-4 rounded-xl text-white font-medium transition-all"
              style={{ background: colors.accent, opacity: loadingTier === 'Standard Project ($2000)' ? 0.7 : 1 }}
            >
              {loadingTier === 'Standard Project ($2000)' ? 'Processing...' : 'Pay Now'}
            </button>
          </motion.div>

          {/* Tier 3: Custom Amount */}
          <motion.div 
            className="p-8 rounded-3xl flex flex-col items-center text-center relative overflow-hidden group"
            style={{ background: colors.surface, border: '1px solid rgba(26,26,24,0.07)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(26,26,24,0.08)' }}
          >
            <h3 className="font-serif text-2xl text-carbon mb-2">Custom Amount</h3>
            <p className="text-sm font-sans text-graphite mb-6">Enter specific invoice amount</p>
            
            <div className="relative w-full mb-8">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-graphite font-serif">$</span>
              <input 
                type="number" 
                min="1"
                placeholder="0.00"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full py-3 pl-10 pr-4 text-3xl font-serif text-carbon border-b-2 border-border focus:border-accent outline-none bg-transparent transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-graphite font-sans">USD</span>
            </div>

            <button
              onClick={() => handlePayment(parseFloat(customAmount) || 0, `Custom Invoice ($${customAmount})`)}
              disabled={loadingTier !== null || !customAmount}
              data-umami-event="Purchase (Custom)"
              className="w-full py-4 rounded-xl text-white font-medium transition-all mt-auto"
              style={{ background: colors.carbon, opacity: (loadingTier === `Custom Invoice ($${customAmount})` || !customAmount) ? 0.7 : 1 }}
            >
              {loadingTier === `Custom Invoice ($${customAmount})` ? 'Processing...' : 'Pay Custom Amount'}
            </button>
          </motion.div>
        </div>
      </section>

      <Footer onBookingOpen={openModal} />
      <BookingModal isOpen={modalOpen} onClose={closeModal} />
    </main>
  )
}
