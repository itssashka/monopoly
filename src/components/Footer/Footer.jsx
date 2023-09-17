import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/match' && <div className='footer'></div>}
    </>    
  )
}

export default Footer