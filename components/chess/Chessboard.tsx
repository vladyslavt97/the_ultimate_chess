"use client"
type Props = {}
import chess from '@/lib/chess';
import { useState } from 'react';
import Row from './Row';

export default function Chessboard({}: Props) {
    //query to db to insert the board and start the game
    const [chessBoard, setChessBoard] = useState(chess.board());
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