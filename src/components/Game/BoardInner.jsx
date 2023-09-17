import React from 'react'
import Chat from './Chat/Chat'
import UIField from './UI/UIField'
import OfferField from './UI/OfferField'
import { useSelector } from 'react-redux'
import { getState } from '../../store/matchSlice'

const BoardInner = () => {
  const state = useSelector(getState);
  return (
    <div className='board-inner'>
        {(state === 'offer' || state === 'confirmation') && <OfferField/>}
        <UIField/>
        <Chat/>
    </div>
  )
}

export default BoardInner