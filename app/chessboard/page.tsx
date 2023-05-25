"use client"
import ResetTheGame from "@/components/ResetTheGame"
import Chessboard from "@/components/chess/Chessboard"

type Props = {}

export default function Page({}: Props) {
  
  return (
    <div className=" overflow-x-hidden">
      <div className="flex justify-center relative top-10 gap-10">
        <h1 className=' text-lg font-bold'>Chess</h1>
        <ResetTheGame/>
      </div>
      <Chessboard/>
    </div>
  )
}