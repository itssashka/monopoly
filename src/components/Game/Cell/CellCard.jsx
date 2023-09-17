import React, { useEffect, useRef } from "react";
import CompanyCardInfo from "./CompanyCardInfo";
import RzdCardInfo from "./RzdCardInfo";
import CommunalCardInfo from "./CommunalCardInfo";
import MatchBtn from "../UI/MatchBtn";
import { useDispatch } from "react-redux";
import { sellCellAsync } from "../../../store/matchSlice";

const CellCard = ({ isCardOpen, target, cell, boardRef, currentPlayer}) => {
    const cardRef = useRef(null);
    const cardClases = isCardOpen ? "cell-card cell-card_active" : "cell-card";
    const dispatch = useDispatch();

    useEffect(() => {
        const handleClick = (e) => {
            const rect = target.current.getBoundingClientRect();
            const cardRect = cardRef.current.getBoundingClientRect();
            const boardRect = boardRef.current.getBoundingClientRect();
            let top = '105%';
            let left = 0;

            if(cell.class.includes('right')){
                left = 0 - cardRect.width - 4 + 'px'
                top = 0;
            }

            if(cell.class.includes('left')) {
                left = '105%';
                top = 0;
            }

            if(cell.class.includes('bottom')) {
                left = 0;
                top = 0 - cardRect.height - 4 + 'px';
            }

            // проверяем вписывается ли окно 
            if(rect.bottom + cardRect.height > boardRect.bottom - rect.height && !cell.class.includes('bottom')){
                top = rect.height - cardRect.height + 'px';
            }

            if(rect.right + cardRect.width > boardRect.right - rect.width && !cell.class.includes('right')){
                left = rect.width - cardRect.width + 'px';
            }

            cardRef.current.style.top = top;
            cardRef.current.style.left = left;
        };

        if(isCardOpen) {
            handleClick();
        }
    }, [isCardOpen]);

    const sellCell = () => {
        dispatch(sellCellAsync(cell.id));
    }

    return (
        <div
            className={cardClases}
            ref={cardRef}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="cell-card__header" style={{backgroundColor: cell.color}}>
                <div className="cell-card__title">{cell.name}</div>
                <div className="cell-card__subtitle">{cell.setName}</div>
            </div>
            <div className="cell-card__body">
                {cell.subtype === "company" && <CompanyCardInfo cell={cell}/>}
                {cell.subtype === 'rzd' && <RzdCardInfo cell={cell}/>}
                {cell.subtype === 'communal' && <CommunalCardInfo cell={cell}/>}
                {cell.owner.match_id === currentPlayer.match_id && <MatchBtn style={{backgroundColor: '#ef6024'}} onClick={sellCell}>Продать</MatchBtn>}
            </div>
        </div>
    );
};

export default CellCard;
