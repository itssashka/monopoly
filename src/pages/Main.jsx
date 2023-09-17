import React from 'react'
import MainTop from '../components/Main/MainTop'
import MainBottom from '../components/Main/MainBottom'
import { joinGameAsync } from '../store/gamesSlice'
import { useDispatch } from 'react-redux'

const Main = () => {

  return (
    <div className='main'>
        <MainTop/>
        <MainBottom/>
    </div>
  )
}

export default Main