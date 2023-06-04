import chess from "@/lib/chess";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

type Props = {}

export default function WhoseTurn({}: Props) {
    const chessBoard = useSelector((state: RootState) => state.board.boardValue);
    const [turn, setTurn] = useState("");
    useEffect(()=>{
        //load the board with .load??
        //chessBoard has the array
        let wOrB=chess.turn()
        setTurn(wOrB)
    }, [chessBoard])
  return (
    <div className={`w-11 border h-11 border-green-500 ${turn === "w" ? 'bg-white' : "bg-black"}`}></div>
  )
}