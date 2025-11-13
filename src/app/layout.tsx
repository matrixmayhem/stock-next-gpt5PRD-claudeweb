import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TransparentLogbook - Investment Advisory & Education',
  description: 'Transparent, education-first investment advisory for retail investors in India',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
