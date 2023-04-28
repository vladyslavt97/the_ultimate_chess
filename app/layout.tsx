import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Ultimate Chess',
  description: 'chess',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-tl from-yellow-400 via-gray-50 to-teal-300`}>{children}</body>
    </html>
  )
}
