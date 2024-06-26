import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

import QueryProvider from '@/providers/query-provider'
import { SheetProvider } from '@/providers/sheet-provider'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'SimpleFinance',
  description: 'Administrando suas finanças',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <QueryProvider>
            <SheetProvider />
            <Toaster />
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
