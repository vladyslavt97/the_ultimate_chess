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
    const chessBoard = useSelector((state: RootState) => state.board.boardValue);
    
    const dispatch = useDispatch();
    useEffect(()=>{
        fetch('/api/gamestate')
            .then(response => {
                return response.json()
            })
            .then(data => {
                dispatch(updateTheBoardState(data.board))
            })
            .catch(err => {
                console.log('er: ', err);
            });
    },[])

    useEffect(() => {
        const channel = supabase.channel('realtime chess').on('postgres_changes', {
            event: "*", schema: "public", table: "game"
        }, (payload) => {
            if ('gamestate' in payload.new) {
                chess.load(payload.new.gamestate);
                const theone: any = chess.board()
                dispatch(updateTheBoardState(theone))
                if(chess.fen() === "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"){
                    dispatch(checkMateState(false))
                }
                if(chess.isGameOver()){
                    dispatch(checkMateState(true))
                }
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