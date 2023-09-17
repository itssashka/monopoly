import React from 'react'

const MyButton = ({children, ...props}) => {
  return (
    <button className='myButton' {...props}>{children}</button>
  )
}

export default MyButton