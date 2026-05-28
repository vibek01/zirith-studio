import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import LenisProvider from '@/components/ui/LenisProvider'
import { DM_Serif_Display, Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif-alt',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://zirith.in'),
  title: {
    default: 'Zirith Studio — Motion Design That Converts',
    template: '%s | Zirith Studio',
  },
  description: 'We engineer SaaS explainers, B2B marketing campaigns, and VSLs that don\'t just explain — they compel. Elite motion design with behavioral pacing.',
  keywords: 'SaaS motion design, product explainer videos, VSL, B2B video marketing, motion graphics studio',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Zirith Studio — Motion Design That Converts',
    description: 'Elite motion design studio for SaaS companies. We combine behavioral pacing with premium motion graphics to drive real conversions.',
    type: 'website',
    locale: 'en_US',
    url: 'https://zirith.in',
    siteName: 'Zirith Studio',
    images: [
      {
        url: '/zirithLogo.jpeg',
        width: 800,
        height: 600,
        alt: 'Zirith Studio Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zirith Studio — Motion Design That Converts',
    description: 'Elite motion design studio for SaaS companies. We combine behavioral pacing with premium motion graphics to drive real conversions.',
    images: ['/zirithLogo.jpeg'],
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
    <html lang="en" className={`${dmSerifDisplay.variable} ${playfairDisplay.variable} ${inter.variable} ${jetBrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://app.cal.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F5F4F0" />
      </head>
      <body className="noise">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "name": "Zirith Studio",
                  "url": "https://zirith.in/"
                },
                {
                  "@type": "Organization",
                  "name": "Zirith Studio",
                  "url": "https://zirith.in",
                  "logo": "https://zirith.in/zirithLogo.jpeg",
                  "image": "https://zirith.in/zirithLogo.jpeg",
                  "description": "Elite motion design studio for SaaS companies, specializing in product explainer videos and VSLs.",
                  "sameAs": [
                    "https://www.linkedin.com/company/zirith-studio/"
                  ]
                }
              ]
            })
          }}
        />
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
