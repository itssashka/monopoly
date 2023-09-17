import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='nav'>
        <Link to="find" className="nav-item selected">Найти игру</Link>
        <Link to="create" className="nav-item">Создать игру</Link>
        <Link to="rules" className="nav-item">Правила</Link>
        <Link to="match" className="nav-item">Игра</Link>
    </div>
  )
}

export default Nav