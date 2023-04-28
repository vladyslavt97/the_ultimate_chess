import Image from "next/image";

type Props = {
    cell: Cell | null,
}

interface Cell{
    square: string;
    type: string;
    color: string
}

export default function Cell({cell}: Props) {
  return (
    <div className="-rotate-90">
        {cell ? <Image width={100} height={100} src={`/pieces/${cell?.type}${cell?.color}.png`} alt="piece"/> : ""}
    </div>
  )
}