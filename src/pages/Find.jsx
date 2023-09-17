import React from 'react'
import GamesList from '../components/Find/GamesList'
import TopPlayers from '../components/Find/TopPlayers'
import Chat from '../components/Find/Chat'

const Find = () => {


  return (
    <div className='find container'>
        <div className="find_side">
          <TopPlayers/>
          <Chat/>
        </div>        
        <GamesList/>
    </div>
  )
}

export default Find