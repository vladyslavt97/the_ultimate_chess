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
    const [moveFrom, setMoveFrom] = useState<string | null>();

    const getImagePositionFROM = async (cell: Cell, event: React.MouseEvent)=>{//its function is to set MoveFrom, if the move would be legal!
        setIsPieceSelected(true);
        if(cell){
            let theCli = event.currentTarget.getAttribute("data-col");
            console.log('checking...123: ', isPieceSelected);
            let legMo = await chess.moves({square: theCli})
            setLegalMove(legMo);
            console.log('lm: ', legMo);
            
            if (legMo.length > 0){
                console.log('move more than one');
                
                setMoveFrom(theCli);
                setIsPieceSelected(true);
                console.log('checking...123: ', isPieceSelected);
            } else {
                console.log('in case of illegal move');
                setIsPieceSelected(false);
                setMoveFrom('');
            }
        } else {
            return;
        }
    } 

    useEffect(() => {
        console.log('isPieceSelected: ', isPieceSelected);
    }, [isPieceSelected]);

    //move to (the next position). Reset isPiceSelected, make a move, update redux. clear the move from!
    const getTheCellTOMove = (cell: Cell, event: React.MouseEvent)=>{//its function is to submit moveFrom and moveTo and change the redux board state
        console.log('her');
        
        console.log(moveFrom);
        
        let dataa = event.currentTarget.getAttribute("data-col");
        console.log(dataa);
        setIsPieceSelected(false);
       
    }

    const handleClick = (cell: Cell, event: React.MouseEvent) => {
        console.log('checking..??.: ', isPieceSelected);
        
        if(isPieceSelected){
            console.log('to');
            getTheCellTOMove(cell, event);
        } else {
            console.log('from');
            getImagePositionFROM(cell, event);
        }
    }

    
    
    //
    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(72 - index).toLowerCase();
    }

     //loop through legal moves to setAttribute
    useEffect(()=>{
        console.log('lm3: ', legalMove);
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
                className={indexColumn % 2 === indexRow % 2 ? "w-12 h-12 bg-yellow-100" : "w-12 h-12 bg-orange-900"}
                data-col={`${getLetterFromIndex(indexColumn)}${8 - indexRow}`}
                onClick={(event) => cell && handleClick(cell, event)}
                >
                    <Cell cell={cell}/>
                </div>
            ))}
        </div>
    )
}