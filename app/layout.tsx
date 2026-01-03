import type { Metadata } from 'next'
import 'react-day-picker/dist/style.css'
import './globals.css'
import MixpanelProvider from '@/components/MixpanelProvider'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'TSLA Rent Miami',
  description: 'Rent a Tesla in Miami with TSLA.miami',
  keywords: ['Tesla', 'Rent', 'Miami', 'TSLA.miami', 'Tesla.miami', 'Tesla Rent', 'Rent a Tesla', 'Rent a Tesla in Miami'],
  authors: [{ name: 'TSLA.miami', url: 'https://tsla.miami' }],
  creator: 'TSLA.miami',
  publisher: 'TSLA.miami',
  openGraph: {
    title: 'TSLA.miami',
    description: 'Rent a Tesla in Miami with TSLA.miami',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DX977ZP8FS"
        />
        <Script
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-DX977ZP8FS');gtag('config','AW-16510475658');`,
          }}
        />
      </head>
      <body>
        <MixpanelProvider>
          {children}
        </MixpanelProvider>
      </body>
    </html>
  )
}

