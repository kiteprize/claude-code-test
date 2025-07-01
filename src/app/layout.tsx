import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { TRPCProvider } from '@/components/providers/TRPCProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Full-Stack Boilerplate',
  description: 'Next.js + tRPC + Supabase Auth + Zustand',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TRPCProvider>
            {children}
          </TRPCProvider>
        </AuthProvider>
      </body>
    </html>
  )
}