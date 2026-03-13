import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
