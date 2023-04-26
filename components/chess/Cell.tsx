type Props = {
    cell: Cell
}

interface Cell{
    square: string;
    type: string;
    color: string
}

export default function Cell({cell}: Props) {
  return (
    <div>
        {cell.type}
    </div>
  )
}