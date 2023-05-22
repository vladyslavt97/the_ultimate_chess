"use client"
type Props = {}
import chess from '@/lib/chess';
import { useEffect, useState } from 'react';
import Row from './Row';
// import supabase from "@/lib/supabase";

type ChessBoard = {
  id: string;
  created_at: string;
  player1: string;
  player2: string;
  gamestate: string
};

export default function Chessboard({}: Props) {
    //query to db to insert the board and start the game
    const [chessBoard, setChessBoard] = useState(chess.board());
    
    
//     useEffect(()=>{
//     const channel = supabase.channel('realtime chess').on('postgres_changes',
//       {
//         event: "*", schema: "public", table: "chess"
//       }, (payload) => {
//         console.log({payload});
//         // setChat([...chat, payload.new as Message])
//         if(payload.eventType === "INSERT"){
//             console.log('payload: ', payload);
            
//         // setChessBoard([payload.new as ChessBoard, ...chessBoard])
//         } else {
//         //   console.log('chat', chat);
          
//         //   const filtered = chessBoard.filter(el => {
//         //     return el.id !== payload.old.id
//         //   })
//         //   console.log('filtered', filtered);
          
//         //   setChessBoard(filtered)
//         }
//       }).subscribe()

//       return () => {
//         supabase.removeChannel(channel)
//       }
//   },[chessBoard, setChessBoard])
    
    return (
        <div className='flex flex-row rotate-90 items-center h-screen w-screen sm:justify-center'>
            {chessBoard.map((row, index)=>(
                <div key={index} className=''>
                    <Row row={row} indexRow={index} chess={chess}/>
                </div>
            ))}
        </div>

    )
}