import React from 'react'
import Board from './Board'
import PlayersList from './Players/PlayersList'

const Game = () => {
  return (
    <div className='game'>
      <PlayersList/>
      <Board/>
    </div>
  )
}

export default Game