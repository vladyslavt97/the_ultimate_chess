type Props = {
    cell: Cell | null
}

interface Cell{
    square: string;
    type: string;
    color: string
}

export default function Cell({cell}: Props) {
  return (
    <div className="-rotate-90">
        {cell?.type}
    </div>
  )
}