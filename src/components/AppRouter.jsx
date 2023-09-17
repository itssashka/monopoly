import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../router/routes'
import ScrollTop from './ScrollTop'
import { useSelector } from 'react-redux'
import { isLogin } from '../store/userSlice'

const AppRouter = () => {
  const isAuth = useSelector(isLogin);
  const currentRoutes = isAuth ? privateRoutes : publicRoutes;

  return (
    <Routes>
        {currentRoutes.map(route => 
            <Route path={route.path} element={route.element} key={route.path}/>
        )}
        <Route path="*" element={<Navigate to='main' replace/>}/>
    </Routes>
  )
}

export default AppRouter