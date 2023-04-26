import Cell from "./Cell"

type Props = {
    row: Array<object>,
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