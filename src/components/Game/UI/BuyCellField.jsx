import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyCellAsync, endOfRollAsync, getCurrentCell } from '../../../store/matchSlice'
import MatchBtn from './MatchBtn';

const BuyCellField = () => {
    const currentCell = useSelector(getCurrentCell);
    const dispatch = useDispatch();
    
    const buyCell = () => {
        console.log(currentCell);
        dispatch(buyCellAsync());
    }

    const cancelOffer = () => {
        //временно
        dispatch(endOfRollAsync());
    }

    return (
        <div className='buy-cell'>
            <div className='buy-cell__title'>Хотите купить '{currentCell.name}' за {currentCell.price}$</div>
            <div className="buy-cell__btns">
                <MatchBtn className="buy-cell__btn" onClick={buyCell}>Купить</MatchBtn>
                <MatchBtn className="buy-cell__btn" onClick={cancelOffer}>Выставить на аукцион</MatchBtn>
            </div>
        </div>
    )
}

export default BuyCellField