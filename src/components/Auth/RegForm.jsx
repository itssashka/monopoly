import React, { useState } from 'react'
import MyInput from '../UI/MyInput'
import MyButton from '../UI/MyButton'
import { useDispatch } from 'react-redux'
import { regUser } from '../../store/userSlice'

const RegForm = () => {
  const [userData, setUserData] = useState({userEmail: '', userName: '', userPassword: '', userPassword2: ''})
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(regUser(userData));
  }

  return (
    <div className='reg-container section'>
        <div className="reg-container_header">Регистрация</div>
        <form action="#" className='reg-container_form' onSubmit={handleSubmit}>
            <MyInput name='Почта' type='text' value={userData.userEmail} onChange={(e) => setUserData({...userData, userEmail: e.target.value})}/>
            <MyInput name='Имя пользователя' type='text' value={userData.userName} onChange={(e) => setUserData({...userData, userName: e.target.value})}/>
            <MyInput name='Пароль' type='password' value={userData.userPassword} onChange={(e) => setUserData({...userData, userPassword: e.target.value})}/>
            <MyInput name='Повторите пароль' type='password' value={userData.userPassword2} onChange={(e) => setUserData({...userData, userPassword2: e.target.value})}/>
            <MyButton>Зарегистрироваться</MyButton>
        </form>
    </div>
  )
}

export default RegForm