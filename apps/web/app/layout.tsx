import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

const description =
  'Free account manager for League of Legends and VALORANT. Switch accounts in seconds with one-click auto login, credentials encrypted at rest on your own PC. Open source, no cloud, Windows.'

export const metadata: Metadata = {
  metadataBase: new URL('https://nidal.ee'),
  title: {
    default: 'Nidalee - League of Legends & VALORANT Account Manager',
    template: '%s - Nidalee',
  },
  description,
  applicationName: 'Nidalee',
  authors: [{ name: 'dancer', url: 'https://github.com/dancer' }],
  creator: 'dancer',
  keywords: [
    'league of legends account manager',
    'valorant account manager',
    'riot account switcher',
    'lol account switcher',
    'valorant account switcher',
    'auto login',
    'smurf manager',
    'riot client launcher',
    'account manager windows',
    'open source account manager',
    'tauri',
    'nidalee',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/48.png', sizes: '48x48', type: 'image/png' }],
    apple: [{ url: '/256.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    url: 'https://nidal.ee',
    siteName: 'Nidalee',
    title: 'Nidalee - League of Legends & VALORANT Account Manager',
    description,
    images: [{ url: '/nidalee.png', width: 1200, height: 630, alt: 'Nidalee' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nidalee - League of Legends & VALORANT Account Manager',
    description,
    images: [{ url: '/nidalee.png', width: 1200, height: 630, alt: 'Nidalee' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#ff4f4f',
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Nidalee',
  description,
  url: 'https://nidal.ee',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Windows',
  license: 'https://www.gnu.org/licenses/gpl-3.0.html',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Person', name: 'dancer', url: 'https://github.com/dancer' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <Analytics />
      </body>
    </html>
  )
}
