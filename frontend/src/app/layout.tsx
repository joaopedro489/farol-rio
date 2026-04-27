import type { Metadata } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import { ThemeProvider } from '../providers/ThemeProvider'
import { QueryProvider } from '../providers/QueryProvider'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/providers/AuthProvider'
import { AuthGuard } from './components/AuthGuard'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500']
})

export const metadata: Metadata = {
  title: 'Farol',
  description: 'Sistema de monitoramento e gestão de crianças em situação de vulnerabilidade social'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col'>
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider>
              <AuthGuard>{children}</AuthGuard>
            </ThemeProvider>
            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
