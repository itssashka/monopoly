import React from 'react'

const MatchBtn = ({children, ...props}) => {
  return (
    <div className='match-btn' {...props}>{children}</div>
  )
}

export default MatchBtn