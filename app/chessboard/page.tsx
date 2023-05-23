"use client"
import Chessboard from "@/components/chess/Chessboard"
import chess from '@/lib/chess';
import { useEffect, useState } from 'react';
import supabase from "@/lib/supabase";

type Props = {}

export default function Page({}: Props) {
  const [chessBoard, setChessBoard] = useState(chess.board());

  useEffect(() => {
        console.log('trying to get there');
        
        const channel = supabase.channel('realtime chess').on('postgres_changes', {
            event: "*", schema: "public", table: "game"
        }, (payload) => {
            console.log({ payload });

            if (payload.eventType === "INSERT") {
                console.log('insertion');
                
            // setChessBoard([payload.new as ChessBoard]);
            } else {
                console.log('something else');
                
            // setChessBoard((prevChessBoard) => {
            //     const filtered = prevChessBoard.filter((el) => el !== payload.old.id);
            //     return filtered;
            // });
            }
        }).subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);
  return (
    <div className=" overflow-x-hidden">
      <h1 className='flex justify-center relative top-10 text-lg font-bold'>Chess</h1>
      <Chessboard/>
    </div>
  )
}