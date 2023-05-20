"use client"

import { Inter } from 'next/font/google'
import Link from 'next/link';
import supabase from "@/lib/supabase";
import chess from '@/lib/chess';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  let player1ID = 1;
  let player2ID = 2;

  //insert chess FEN to supabase and start the game
  //add fetch
  const startTheGame = async () =>{
    const {data, error} = await supabase.from('chessGame').insert({player1: player1ID, player2: player2ID, chessBoard: chess.fen()})
    console.log(data);
  }

  return (
    <main className='overflow-hidden min-h-screen'>
      <Link href="/chessboard" onClick={startTheGame}>Click here to start the game!</Link>
    </main>
  )
}
