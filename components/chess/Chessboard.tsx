"use client"
type Props = {}
import { Chess } from 'chess.js'
import { useState } from 'react';
import Row from './Row';

export default function Chessboard({}: Props) {
    const chess = new Chess()
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