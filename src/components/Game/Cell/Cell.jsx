import React, { useEffect, useRef, useState } from "react";
import CellCard from "./CellCard";
import Chip from "../Chip/Chip";
import { useDispatch, useSelector } from "react-redux";
import { addToOffer, getCurrentPlayer, getOfferPlayer, getState } from "../../../store/matchSlice";

const Cell = ({ cell,boardRef }) => {
    const [isCardOpen, setIsCardOpen] = useState(false);
    const currentPlayer = useSelector(getCurrentPlayer);
    const offerPlayer = useSelector(getOfferPlayer);
    const dispatch = useDispatch();
    const state = useSelector(getState);
    const cellRef = useRef(null);

    const clickHandle = () => {
        //if state === 'offer' add property to offer
        if(state !== 'offer') {
            setIsCardOpen(!isCardOpen);
        } else {
            if(cell?.owner?.match_id === currentPlayer.match_id || cell?.owner?.match_id === offerPlayer.match_id) {
                dispatch(addToOffer(cell));
            }
        }
    }

    const clickHandleOutside = (e) => {
        if(cellRef.current && !cellRef.current.contains(e.target)) {
            setIsCardOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', clickHandleOutside, true)
        return () => {
            document.removeEventListener('click', clickHandleOutside, true)
        }
    })

    return (
        <div
            className="cell-container"
            key={cell.id}
            style={{ gridRow: cell.row, gridColumn: cell.column, backgroundColor: cell?.owner?.color}}
            onClick={clickHandle}
            ref={cellRef}
        >
            <div className="chip-container">
                {cell?.players.length > 0 && cell.players.map(player => <Chip key={player.match_id} player={player}/>)}
            </div>
            {cell.type === 'property' && <CellCard isCardOpen={isCardOpen} target={cellRef} cell={cell} boardRef={boardRef} currentPlayer={currentPlayer}/>}
            <div className={cell.class}>
                <div className="cell__img">
                    <img src={cell.img} alt="" />
                </div>
                {cell.type === 'property' && <div className="cell__price" style={{backgroundColor: cell.color}}>{cell.price}</div>}
            </div>
        </div>
    );
};

export default Cell;
