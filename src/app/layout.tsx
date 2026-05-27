import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import LenisProvider from '@/components/ui/LenisProvider'
import Preloader from '@/components/ui/Preloader'

export const metadata: Metadata = {
  title: 'Zirith Studio — Motion Design That Converts',
  description: 'We engineer SaaS explainers, B2B marketing campaigns, and VSLs that don\'t just explain — they compel. Elite motion design with behavioral pacing.',
  keywords: 'SaaS motion design, product explainer videos, VSL, B2B video marketing, motion graphics studio',
  icons: {
    icon: '/zirithLogo.jpeg',
    shortcut: '/zirithLogo.jpeg',
    apple: '/zirithLogo.jpeg',
  },
  openGraph: {
    title: 'Zirith Studio — Motion Design That Converts',
    description: 'Elite motion design studio for SaaS companies. We combine behavioral pacing with premium motion graphics to drive real conversions.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F5F4F0" />
      </head>
      <body className="noise">
        <Preloader />
        <LenisProvider>
          {children}
        </LenisProvider>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="3b4e40be-2f87-4f01-9580-3f67054f73ad"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
