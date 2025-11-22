import type { Metadata } from 'next'
import 'react-day-picker/dist/style.css'
import './globals.css'
import MixpanelProvider from '@/components/MixpanelProvider'

export const metadata: Metadata = {
  title: 'TSLA Rent Miami',
  description: 'A Next.js application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MixpanelProvider>
          {children}
        </MixpanelProvider>
      </body>
    </html>
  )
}

