import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSiteSettings } from '@/lib/payload-client'

export const metadata: Metadata = {
  title: 'TransparentLogbook - Investment Advisory & Education',
  description: 'Transparent, education-first investment advisory for retail investors in India',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let siteSettings: any = null

  try {
    siteSettings = await getSiteSettings()
  } catch (error) {
    // Site settings not yet configured
    console.log('Site settings not configured yet')
  }

  const sebiRegistration = siteSettings?.sebi?.registrationNumber
  const disclaimer = siteSettings?.sebi?.disclaimer

  return (
    <html lang="en">
      <body>
        <Header />
        <main className="main-content">{children}</main>
        <Footer sebiRegistration={sebiRegistration} disclaimer={disclaimer} />
      </body>
    </html>
  )
}
