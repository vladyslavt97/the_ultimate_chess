import Cell from "./Cell"

type Props = {
    row: Array<Cell | null>,
    indexRow: number
}
interface Cell{
    square: string;
    type: string;
    color: string
}

export default function Row({row, indexRow}: Props) {
  return (
    <div>
        {row.map((cell, index) => (
            <div key={index} className={index % 2 === indexRow % 2 ? "w-10 h-10 bg-white" : "w-10 h-10 bg-black"}>
                <Cell cell={cell}/>
            </div>
        ))}
    </div>
  )
}