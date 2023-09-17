import React, { useState } from 'react'

const MyInput = ({name, children, type = 'text', ...props}) => {
  const isDisabled = props.disabled;
  const inputStyles = isDisabled ? 'input disabled' : 'input';

  return (
    <div className={inputStyles}>        
        <input type={type} className='input-field' {...props} required/>
        <div className="input-name">{name}</div>
        {children}
    </div>
  )
}

export default MyInput