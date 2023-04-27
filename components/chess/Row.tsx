import Cell from "./Cell"

type Props = {
    row: Array<Cell | null>,
}
interface Cell{
    square: string;
    type: string;
    color: string
}

export default function Row({row}: Props) {
  return (
    <div>
        {row.map((cell, index) => (
            <div key={index}>
                <Cell cell={cell}/>
            </div>
        ))}
    </div>
  )
}