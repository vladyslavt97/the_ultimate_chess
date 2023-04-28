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
  // const isPieceSelectedState = useSelector((state: RootState) =>state.moveFrom.valueSelected);
  const handleClick = (cell: Cell, event: React.MouseEvent) => {
    console.log('ups');
    
        // if(isPieceSelectedState){
        //     getTheCellTOMove(event, cell);
        // } else {
        //     getImagePositionFROM(cell);
        // }
        
    }

    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(72 - index).toLowerCase();
    }
  return (
    <div>
        {row.map((cell, indexColumn) => (
            <div key={indexColumn} className={indexColumn % 2 === indexRow % 2 ? "w-10 h-10 bg-yellow-100" : "w-10 h-10 bg-orange-900"}
            data-col={`${getLetterFromIndex(indexColumn)}${indexRow + 1}`}
            onClick={(event) => cell && handleClick(cell, event)}
            >
                <Cell cell={cell}/>
            </div>
        ))}
    </div>
  )
}