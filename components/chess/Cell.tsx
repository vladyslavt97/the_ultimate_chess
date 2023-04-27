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
    <div>
        {cell?.type}
    </div>
  )
}