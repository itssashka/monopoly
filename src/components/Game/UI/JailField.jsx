import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyCellAsync, buyoutAsync, endOfRollAsync, getCurrentCell, rollDiceAsync } from '../../../store/matchSlice'
import MatchBtn from './MatchBtn';

const JailField = () => {
    const currentCell = useSelector(getCurrentCell);
    const dispatch = useDispatch();
    
    const rollDice = () => {
        dispatch(rollDiceAsync());
    };

    const buyout = () => {
        //временно
        dispatch(buyoutAsync());
    }

    return (
        <div className='buy-cell'>
            <div className='buy-cell__title'>Вы можете испытать удачи или заплтить выкуп в размере 500$</div>
            <div className="buy-cell__btns">
                <MatchBtn className="buy-cell__btn" onClick={rollDice}>Бросить кубик</MatchBtn>
                <MatchBtn className="buy-cell__btn" onClick={buyout}>Заплатить выкуп</MatchBtn>
            </div>
        </div>
    )
}

export default JailField