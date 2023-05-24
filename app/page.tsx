"use client"

import { Inter } from 'next/font/google'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  let player1ID = 5;
  let player2ID = 16;
  
  const startTheGame = async () =>{
    try {
    const response = await fetch("/api/startgame", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({player1: player1ID, player2: player2ID}),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log('responseData, ',responseData);
    
    return responseData;
  } catch (error) {
    console.error('Errorrrr:', error);
    throw error;
  }
  }

  return (
    <main className='overflow-hidden min-h-screen'>
      <Link href="/chessboard" 
      onClick={startTheGame}
      >Click here to start the game!</Link>
    </main>
  )
}
