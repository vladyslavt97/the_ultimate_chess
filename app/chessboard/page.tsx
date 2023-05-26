"use client"
import ResetTheGame from "@/components/ResetTheGame"
import Chessboard from "@/components/chess/Chessboard"

type Props = {}

export default function Page({}: Props) {
  
  return (
    <div className="overflow-hidden">
      <div className="flex justify-center gap-10 mt-10 -mb-10">
        <h1 className=''>Chess</h1>
        <ResetTheGame/>
      </div>
      <Chessboard/>
    </div>
  )
}