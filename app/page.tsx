import { Inter } from 'next/font/google'
import Chessboard from '@/components/chess/Chessboard';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main className='overflow-hidden'>
      <h1 className='flex justify-center relative top-10 text-lg font-bold'>Chess</h1>
      <Chessboard/>
    </main>
  )
}
