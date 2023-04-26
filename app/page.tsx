import { Inter } from 'next/font/google'
import Chessboard from '@/components/chess/Chessboard';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main>
      <h1>Chess</h1>
      <Chessboard/>
    </main>
  )
}
