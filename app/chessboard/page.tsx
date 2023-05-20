import Chessboard from "@/components/chess/Chessboard"

type Props = {}

export default function Page({}: Props) {
  return (
    <div>
      <h1 className='flex justify-center relative top-10 text-lg font-bold'>Chess</h1>
      <Chessboard/>
    </div>
  )
}