import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDices } from '../../../store/matchSlice';

const Dices = () => {
    const [isVisible, setIsVisible] = useState(false);
    const dices = useSelector(getDices);

    useEffect(()=>{
        setIsVisible(true);
        const timeOutId = setTimeout(()=>{
            setIsVisible(false);
            clearTimeout(timeOutId);
        }, 2000)
    },[dices])

    return (
    <>
        {isVisible && <div className='dices'>
            <img src={`./imgs/dices/${dices.dice_1}.svg`} alt="" />
            <img src={`./imgs/dices/${dices.dice_2}.svg`} alt="" />
            <div className="dices__sum">= {dices.dice_1 + dices.dice_2}</div>
        </div>}
    </>
  )
}

export default Dices