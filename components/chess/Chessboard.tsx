"use client"
type Props = {}
import { Chess } from 'chess.js'
import { useState } from 'react';
import Row from './Row';

export default function Chessboard({}: Props) {
    const chess = new Chess()
    const [chessBoard, setChessBoard] = useState(chess.board());
    console.log(chessBoard);
    
    return (
        <div className='flex flex-row items-center justify-center h-screen'>
            {chessBoard.map((row, index)=>(
                <div key={index}>
                    <Row row={row}/>
                </div>
            ))}
        </div>

    )
}