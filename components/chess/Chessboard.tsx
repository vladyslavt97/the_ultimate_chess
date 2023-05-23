"use client"
type Props = {}
import chess from '@/lib/chess';
import { useEffect, useState } from 'react';
import Row from './Row';
import supabase from "@/lib/supabase";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type ChessBoard = {
  id: string;
  created_at: string;
  player1: string;
  player2: string;
  gamestate: string
};

export default function Chessboard({}: Props) {
    //query to db to extract the board for certain two players and start the game
    const chessBoard2 = useSelector((state: RootState) => state.board.boardValue);

    const [chessBoard, setChessBoard] = useState(chess.board());
    useEffect(()=>{
        
        // setChessBoard(chessBoard2);
    },[chessBoard2])

    
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
        <div className='flex flex-row rotate-90 items-center h-screen w-screen sm:justify-center'>
            {chessBoard.map((row, index)=>(
                <div key={index} className=''>
                    <Row row={row} indexRow={index} chess={chess}/>
                </div>
            ))}
        </div>

    )
}