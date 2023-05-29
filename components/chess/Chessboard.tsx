"use client"
type Props = {}
import chess from '@/lib/chess';
import { useEffect, useState } from 'react';
import Row from './Row';
import supabase from "@/lib/supabase";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateTheBoardState } from '@/redux/boardSlice';
import { checkMateState } from '@/redux/checkmateSlice';

interface Cell{
    square: string,
    type: string,
    color: string
}

type ChessBoard = {
  id: string;
  created_at: string;
  player1: string;
  player2: string;
  gamestate: string
};

export default function Chessboard({}: Props) {
    //query to db to extract the board for certain two players and start the game
    const chessBoard = useSelector((state: RootState) => state.board.boardValue);
    console.log('chessBoardchessBoardchessBoard, ', chessBoard);
    
    const dispatch = useDispatch();
    // const [chessBoard, setChessBoard] = useState(chess.board());
    useEffect(()=>{
        fetch('/api/gamestate')
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log('get data /gamestate', data.board);
                dispatch(updateTheBoardState(data.board))
            })
            .catch(err => {
                console.log('er: ', err);
            });
    },[])

    useEffect(() => {
        console.log('trying to get there');
        
        const channel = supabase.channel('realtime chess').on('postgres_changes', {
            event: "*", schema: "public", table: "game"
        }, (payload) => {
            console.log("asdasdad wichtig", payload );
            // chess.load(payload.new.gamestate)
            // console.log('+++', chess.board());
            if ('gamestate' in payload.new) {
                chess.load(payload.new.gamestate);
                console.log('+++', chess.board());
                const theone: any = chess.board()
                console.log('64', theone);


                //check for gameover
                if(chess.isGameOver()){
                    dispatch(updateTheBoardState(theone))
                    dispatch(checkMateState(true))
                }

                dispatch(updateTheBoardState(theone))
            }
            
        }).subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [chessBoard]);


    
    return (
        <div className='flex flex-row rotate-90 items-center h-screen w-screen sm:justify-center'>
            {chessBoard.length !== 0 ? 
                <>
                    {(chessBoard as (Cell | null)[][]).map((row, index) => (
                        <div key={index} className=''>
                            <Row row={row} indexRow={index} chess={chess}/>
                        </div>
                    ))} 
                </>
            : <h1 className='flex justify-center items-center -rotate-90 text-2xl z-50 text-green-600'>Loading chessboard ♟️</h1>}
        </div>

    )
}