import React from 'react'

const CustomButton = ({ children, value, onChange, onFocus }) => {
  return (
    <input 
        className='text-preset-4 text-center w-[116px] px-[16px] py-[8px] rounded-md bg-[var(--primary-gray-50)] text-[var(--primary-green-900)] focus:outline-[var(--primary-green-900)]'
        placeholder='Custom'
        type='text'
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        >{children}
    </input>
  )
}

export default CustomButton