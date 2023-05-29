"use client"
import GameOverComp from "@/components/GameOverComp";
import ResetTheGame from "@/components/ResetTheGame"
import Chessboard from "@/components/chess/Chessboard"
import chess from "@/lib/chess";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

type Props = {}

export default function Page({}: Props) {
  const isGameover = useSelector((state: RootState) =>state.checkMate.valueChechMate);
  console.log('gmaeoverooor,', isGameover);

  const chessBoard = useSelector((state: RootState) => state.board.boardValue);
  console.log('ch', chess.fen());
  let currentFen = chess.fen();
  
  console.log("boolean", currentFen !== "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  
  return (
    <div className="overflow-hidden">
      <div className="flex justify-center gap-10 mt-10 -mb-10">
        <h1 className=''>Chess</h1>
        <ResetTheGame/>
      </div>
      <Chessboard/>
      {isGameover && (currentFen !== "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") && 
        <div id='checkmate'>
            <GameOverComp />
      </div>}
    </div>
  )
}