import { Navbar } from '@/components'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import './globals.css'
import './App.scss'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'My portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${roboto.className} app`}>
        <Navbar />
          {children}
      </body>
    </html>
  )
}
