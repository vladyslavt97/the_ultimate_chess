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
  const chessBoard = useSelector((state: RootState) => state.board.boardValue);
  
  
  chess.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  //attempt two
  
  console.log("seond important", isGameover);
  let someVal;
  for (let i = 0; i <= chess.board().length; i++){
    for (let y = 0; y <= chess.board().length; y++){
        if (i !== y){
          someVal = false;
        return;
      }
    }
  }
  console.log('someVal,', someVal);
  
  return (
    <div className="overflow-hidden">
      <div className="flex justify-center gap-10 mt-10 -mb-10">
        <h1 className=''>Chess</h1>
        <ResetTheGame/>
      </div>
      <Chessboard/>
      {(isGameover && chessBoard !== chess.board()) && 
        <div id='checkmate'>
            <GameOverComp />
      </div>}
    </div>
  )
}