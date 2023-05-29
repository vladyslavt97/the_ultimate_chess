import { useEffect, useState } from "react";
import Cell from "./Cell"
import { isPieceSelected, moveFromState, clearTheMoveFrom } from '@/redux/moveFromSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateTheBoardState } from "@/redux/boardSlice";
import { checkMateState } from "@/redux/checkmateSlice";

type Props = {
    row: Array<Cell | null>,
    indexRow: number,
    chess: any
}
interface Cell{
    square: string,
    type: string,
    color: string
}

export default function Row({row, indexRow, chess}: Props) {
    const isPieceSelectedState = useSelector((state: RootState) =>state.moveFrom.valueSelected);
    const stateMoveFrom = useSelector((state: RootState) =>state.moveFrom.value);
    const clickedUserId = useSelector((state: RootState) => state.board.id);


    // const thePlayersToColour = useSelector((state: RootState) => state.board.gameInserted[0]);

    // const myId = useSelector((state: RootState) => state.board.myId);
    // const [colour, setColour] = useState<string>('');
    
    // useEffect(()=>{
    //     if(thePlayersToColour){
    //         if(thePlayersToColour.player1_id === myId){
    //             setColour('w');
    //         }else if (thePlayersToColour.player2_id === myId){
    //             setColour('b');
    //         }
    //     }
    // }, [])

    const [legalMove, setLegalMove] = useState<string[]>([]);
    const dispatch = useDispatch();


    const getImagePositionFROM = (cell: Cell | null)=>{
        // if(cell.color === colour){
            const value = cell?.square;
            dispatch(moveFromState(value!))
            dispatch(isPieceSelected(true))

            fetch('/api/legalmoves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({possibleMoves: value}),
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                //in case of illegal move
                if (data.legalmoves.length === 0){
                    dispatch(clearTheMoveFrom(''))
                    dispatch(isPieceSelected(false))
                    console.log('its not your turn :(');
                } else {
                    //the move is legal
                    setLegalMove(data.legalmoves);
                }
            })
            .catch(err => {
                console.log('er: ', err);
            });

        // } else {
        //     return;
        // }
    } 

    const getTheCellTOMove = (event: React.MouseEvent)=>{
        let dataa = event.currentTarget.getAttribute("data-col");

        dispatch(isPieceSelected(false));
        fetch('/api/moveto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({from: stateMoveFrom, to: dataa, clickedUser: clickedUserId}),
        })
        .then(response => {
            if(response.status === 200){
                // console.log("SUCCESSS")
                return response.json();     
            }else {
                console.log("SOMETHING WENT WRONG")
            }
        })
        .then(data => {
            if(data.gameOver){
                dispatch(updateTheBoardState(data.board))
                dispatch(checkMateState(data.gameOver))
            }
            dispatch(updateTheBoardState(data.board))
        })
        .then(()=>{
            dispatch(clearTheMoveFrom(''))
        })
        .catch(err => {
                console.log('error unfortunately: ', err);
            });
    }

    const handleClick = (cell: Cell | null,  event: React.MouseEvent) => { 
        
        if(isPieceSelectedState){
            getTheCellTOMove(event);
        } else {
            getImagePositionFROM(cell);
        }
        
    }

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
        if (matches && !isPieceSelectedState){
            let dataAt = document.querySelectorAll(`[data-col=${matches[0]}]`);
            (dataAt[0] as HTMLElement).removeAttribute('id');
        } 
    }

    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(65 + index).toLowerCase();
    }
    
    return (
        <div className="flex flex-col-reverse">
            {row.map((cell, indexColumn) => (
               <div key={indexColumn} 
                className={indexColumn % 2 === indexRow % 2 ? "w-11 h-11 bg-yellow-100" : "w-11 h-11 bg-orange-900"}
                data-col={`${getLetterFromIndex(indexColumn)}${8 - indexRow}`}
                onClick={(event) => handleClick(cell, event)}
                >
                    <Cell cell={cell}/>
                </div>
            ))}
        </div>
    )
}