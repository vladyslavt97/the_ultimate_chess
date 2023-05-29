import React from 'react'
import { useDispatch } from 'react-redux';
import chess from '@/lib/chess';
import { updateTheBoardState } from '@/redux/boardSlice';
type Props = {}

interface Cell{
    square: string,
    type: string,
    color: string
}

export default function ResetTheGame({}: Props) {

    const dispatch = useDispatch();
    
    const resetGame = async () => {
      try {
        const response = await fetch("/api/reset-the-game", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ player1: 5, player2: 17}),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        
        let board: any = chess.board();
        dispatch(updateTheBoardState(board));

        return responseData;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
  };

  return (
    <button onClick={resetGame} className=' cursor-pointer bg-red-300 p-2 w-20 rounded-full z-0'>Reset</button>
  )
}