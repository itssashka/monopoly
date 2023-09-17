import React, { useEffect, useState } from 'react'
import MyInput from '../UI/MyInput'
import MyButton from '../UI/MyButton'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import MySection from '../Section/MySection';

const LoginForm = () => {
    const [userData, setUserData] = useState({playerEmail: '', playerPassword: ''});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(userData))
        navigate('/find')
    }

  return (
    <div className='login-container section'>
        <div className="login-container_header">Вход</div>
        <form action="#" className='login-container_form' onSubmit={handleSubmit}>
            <MyInput name='Почта' type='text' value={userData.playerEmail} onChange={(e) => setUserData({...userData, playerEmail: e.target.value})}/>
            <MyInput name='Пароль' type='password' value={userData.playerPassword} onChange={(e) => setUserData({...userData, playerPassword: e.target.value})}/>
            <MyButton>Войти</MyButton>
        </form>
    </div>
  )
}

export default LoginForm