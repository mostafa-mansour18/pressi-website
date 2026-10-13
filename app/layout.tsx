// app/layout.tsx
import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

// The public address of the site. Next.js uses it to turn relative links
// (like the OG image) into full URLs. When you buy a custom domain, set
// NEXT_PUBLIC_SITE_URL in Vercel and nothing in this file needs to change.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pressi-website.vercel.app'

const siteTitle = 'PRESSI by Dina | Luxury Press-On Nails from Lebanon'
const siteDescription =
  'Luxury press-on nails, handmade in Lebanon. Made to Press. Made to Impress. Free delivery in Lebanon over $80.'

// The preview image shown when the link is shared on WhatsApp, Instagram DMs,
// iMessage, etc. The file lives at public/og-image.png.
// If you ever replace the image and WhatsApp still shows the old one,
// change ?v=1 to ?v=2 (previews are cached).
const ogImage = {
  url: '/og-image.png?v=1',
  width: 1200,
  height: 630,
  alt: 'PRESSI by Dina. Made to Press. Made to Impress.',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    // Pages added later (like each set) will show "Set name | PRESSI by Dina"
    template: '%s | PRESSI by Dina',
  },
  description: siteDescription,
  openGraph: {
    type: 'website',
    siteName: 'PRESSI by Dina',
    title: siteTitle,
    description: siteDescription,
    locale: 'en_US',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage.url],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans bg-ivory text-ink antialiased">
        {children}
      </body>
    </html>
  )
}
