import React from 'react'

const Loader = () => {
  return (
    <div className='loader'>
      <span style={{"--i": 1}}></span>
      <span style={{"--i": 2}}></span>
      <span style={{"--i": 3}}></span>
    </div>
  )
}

export default Loader