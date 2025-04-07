import React from 'react'

const TipButton = ({onClick, isSelected, value, children}) => {


  return (
    <button
        className={`text-preset-3 w-[116px] px-[16px] py-[8px] rounded-md 

          ${isSelected ? 'bg-[var(--primary-green-200)] text-[var(--primary-green-900)]' : 'bg-[var(--primary-green-900)] text-[var(--primary-white)] hover:bg-[var(--primary-green-200)] hover:text-[var(--primary-green-900)]'}`
        
        }
        onClick={onClick}
        value={value}
    >
        {children}
    </button>
  )
}

export default TipButton