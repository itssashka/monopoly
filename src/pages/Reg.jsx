import React from 'react'
import RegForm from '../components/Auth/RegForm'
import { Link } from 'react-router-dom'

const Reg = () => {
  return (
    <div className='reg'>
      <RegForm/>
      <div className="reg-to_login">
                Уже есть аккаунт?{" "}
                <Link to="/login" className="myLink">
                    Войти
                </Link>
            </div>
    </div>
  )
}

export default Reg