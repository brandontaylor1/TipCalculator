import React from 'react'

const Input = ({heading, value, icon, onChange, onFocus, children}) => {

  return (
    <form>
        <h1 className='text-preset-5 text-[var(--primary-gray-500)]'>{heading}</h1>
        <div className='flex items-center justify-between bg-[var(--primary-gray-50)] px-[16px] py-[8px] mt-2'>
            <img src={icon} alt="icon" />
            <input
                className='text-preset-3 text-right text-[var(--primary-green-900)] focus:outline-none bg-[var(--primary-gray-50)]'
                type="text"
                placeholder="0"
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                >{children}</input>
        </div>
    </form>
  )
}

export default Input