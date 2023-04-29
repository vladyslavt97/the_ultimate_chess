import { useEffect, useState } from "react";
import Cell from "./Cell"

type Props = {
    row: Array<Cell | null>,
    indexRow: number,
    chess: any
}
interface Cell{
    square: string;
    type: string;
    color: string
}

export default function Row({row, indexRow, chess}: Props) {
    const [isPieceSelected, setIsPieceSelected] = useState(false);
    const [legalMove, setLegalMove] = useState<string[]>([]);

    //move from (the current position)
    const getImagePositionFROM = (cell: Cell, event: React.MouseEvent)=>{
        if(cell){
            const value = cell.square;
            // dispatch(moveFromState(value!))
            setIsPieceSelected(true);
            setLegalMove(chess.moves({square: event.currentTarget.getAttribute("data-col")}));
        } else {
            return;
        }
    } 

    //move to (the next position). Reset isPiceSelected, make a move, update redux
    const getTheCellTOMove = (cell: Cell, event: React.MouseEvent)=>{
        let dataa = event.currentTarget.getAttribute("data-col");
        console.log(dataa);
        setIsPieceSelected(false);
       
    }

    const handleClick = (cell: Cell, event: React.MouseEvent) => {
        if(isPieceSelected){
            console.log('to');
            getTheCellTOMove(cell, event);
        } else {
            console.log('from');
            getImagePositionFROM(cell, event);
        }
    }

    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(72 - index).toLowerCase();
    }


    //legal moves!!!

     //loop through legal moves to setAttribute
    useEffect(()=>{
        for (let l of legalMove){
            let matches = l.match(/\w[0-9]/);
            if (matches){
                let dataAt = document.querySelectorAll(`[data-col=${matches[0]}]`);
                (dataAt[0] as HTMLElement).setAttribute('id', 'possible-move');
            } 
        }
    }, [legalMove]);
    //loop through legal moves to removeAttribute
    for (let l of legalMove){
        let matches = l.match(/\w[0-9]/);
        if (matches && !isPieceSelected){
            let dataAt = document.querySelectorAll(`[data-col=${matches[0]}]`);
            (dataAt[0] as HTMLElement).removeAttribute('id');
        } 
    }
    
    return (
        <div>
            {row.map((cell, indexColumn) => (
                <div key={indexColumn} 
                className={indexColumn % 2 === indexRow % 2 ? "w-10 h-10 bg-yellow-100" : "w-10 h-10 bg-orange-900"}
                data-col={`${getLetterFromIndex(indexColumn)}${8 - indexRow}`}
                onClick={(event) => cell && handleClick(cell, event)}
                >
                    <Cell cell={cell}/>
                </div>
            ))}
        </div>
    )
}