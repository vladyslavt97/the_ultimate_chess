"use client"
import GameOverComp from "@/components/GameOverComp";
import ResetTheGame from "@/components/ResetTheGame"
import Chessboard from "@/components/chess/Chessboard"
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

type Props = {}

export default function Page({}: Props) {
  const isGameover = useSelector((state: RootState) =>state.checkMate.valueChechMate);
  console.log(isGameover);
  
  return (
    <div className="overflow-hidden">
      <div className="flex justify-center gap-10 mt-10 -mb-10">
        <h1 className=''>Chess</h1>
        <ResetTheGame/>
      </div>
      <Chessboard/>
      {isGameover && 
        <div id='checkmate'>
            <GameOverComp />
      </div>}
    </div>
  )
}