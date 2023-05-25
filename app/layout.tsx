import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from "@/redux/provider";
import ProvidersSession from "@/components/ProvidersSession";
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Chess',
  description: 'chess',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  // session: any;
}) {
  return (
    <html lang="en">
        <body className={`${inter.className} bg-gradient-to-tl from-yellow-400 via-gray-50 to-teal-300`}>
          <ProvidersSession>
            <Providers>{children}</Providers>
          </ProvidersSession>
        </body>
    </html>
  )
}
