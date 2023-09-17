import React from 'react'
import UserInfo from '../components/Account/UserInfo'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../store/userSlice';
import GamesHistory from '../components/Account/GamesHistory';

const Account = () => {
  const userInfo = useSelector(getCurrentUser);
  console.log(userInfo);
  return (
    <div className='account'>
      <UserInfo userInfo={userInfo}/>
      <GamesHistory userInfo={userInfo}/>
    </div>
  )
}

export default Account