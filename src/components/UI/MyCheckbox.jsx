import React from 'react'

const MyCheckbox = ({title, ...props}) => {
  return (
    <div className='checkbox'>
        <input type="checkbox" {...props}/>
        <div className='checkbox_name'>{title}</div>
    </div>
  )
}

export default MyCheckbox