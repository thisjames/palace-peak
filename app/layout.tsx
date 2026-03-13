import type { Metadata } from 'next'
import { Bebas_Neue, DM_Mono } from 'next/font/google'
import './globals.css'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const mono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'When did Palace peak?',
  description: 'Vote for the year Palace Skateboards was at its absolute peak.',
  openGraph: {
    title: 'When did Palace peak?',
    description: 'Vote for the year Palace Skateboards was at its absolute peak.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
