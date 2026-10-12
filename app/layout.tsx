// app/layout.tsx
import type { Metadata } from 'next'
import { Fraunces, Inter } from 
'next/font/google'
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

export const metadata: Metadata = {
  title: 'Pressi by Dina',
description: 'Luxury press-on nails from Lebanon.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" 
className={`${fraunces.variable} 
${inter.variable}`}>
      <body className="font-sans bg-ivory 
text-ink antialiased">
        {children}
      </body>
    </html>
  )
}
