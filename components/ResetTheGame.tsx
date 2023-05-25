import { clearTheBoard } from '@/redux/checkmateSlice';
import React from 'react'
import { useDispatch } from 'react-redux';

type Props = {}

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
      dispatch(clearTheBoard(true));
      return responseData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return (
    <button onClick={resetGame} className=' cursor-pointer bg-red-300 p-2 w-20 rounded-full'>Reset</button>
  )
}