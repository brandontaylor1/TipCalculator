import React, { useState, useEffect } from 'react'

import Input from '../components/Input'
import TipButton from '../components/TipButton'
import CustomButton from '../components/CustomButton'

import dollarIcon from '../assets/icon-dollar.svg'
import personIcon from '../assets/icon-person.svg'

const BillContainer = () => {

// STATE Variables
  const [ bill, setBill ] = useState(0)
  const [ tip, setTip ] = useState(0)
  const [ customTip, setCustomTip ] = useState("") 
  const [ numberOfPeople, setNumberOfPeople ] = useState(0)
  const [ tipAmount, setTipAmount] = useState(0)
  const [ totalAmount, setTotalAmount] = useState(0)
  const [ selectedButton, setSelectedButton] = useState(null)
  const [ isActive, setIsActive] = useState(false)

  const [ billError, setBillError ] = useState(false)
  const [ numberOfPeopleError, setNumberOfPeopleError ] = useState(false) 
  const [ customTipError, setCustomTipError ] = useState(false)


  const tipValues = [0.05, 0.1, 0.15, 0.25, 0.5]

  // HANDLER Functions
  const handleBillChange = (e) => {
    let value = e.target.value;

    if (!/^\d*\.?\d*$/.test(value)) {
      setBillError('Invalid input. Please enter a valid number.');
      return;
    }

    if (value.includes('.')) {
      const [integerPart, decimalPart] = value.split('.');
      if (decimalPart.length > 2) {
        value = `${integerPart}.${decimalPart.slice(0, 2)}`;
      }
    }

    if (parseFloat(value) <= 0) {
      setBillError('Bill must be greater than 0.');
    } else {
      setBillError('');
    }

    setBill(value);
  };  

  const handleNumberOfPeopleChange = (e) => {
    const value = e.target.value;

    if (!/^\d+$/.test(value) || parseInt(value) <= 0) {
      setNumberOfPeopleError('Cannot be zero or a negative number.');
    } else {
      setNumberOfPeopleError('');
    }

    setNumberOfPeople(value);
  };

  const handleCustomTipChange = (e) => {
    const value = e.target.value;

    if (!/^\d*\.?\d*$/.test(value) || parseFloat(value) <= 0) {
      setCustomTipError('Custom tip must be a positive number.');
    } else {
      setCustomTipError('');
    }

    setCustomTip(value);
  };

  const handleButtonClick = (value) => {
    setTip(value)
    setSelectedButton(value)
  }

  const handleReset = () => {
    setBill(0)
    setTip(0)
    setNumberOfPeople(0)
    setCustomTip(0)
    setTipAmount(0)
    setTotalAmount(0)
    setSelectedButton(null)
    setIsActive(false)
    setBillError('')
    setNumberOfPeopleError('')
  }

    useEffect(() => {
      if (numberOfPeople > 0 && bill > 0 && tip > 0 || customTip > 0) {
        setIsActive(true)
        

        if(customTip > 0) {
          setTip(customTip*0.01)
          setSelectedButton(customTip*0.01)

          const tipAmount = (bill * customTip) / numberOfPeople
          const totalAmount = ((bill / numberOfPeople) + tipAmount)
          setTipAmount(tipAmount)
          setTotalAmount(totalAmount)
        } 
          
        const tipAmount = (bill * tip) / numberOfPeople
        const totalAmount = ((bill / numberOfPeople) + tipAmount)
      
        setTipAmount(tipAmount)
        setTotalAmount(totalAmount)
        
        }
        
       else {
         setTipAmount(0.00)
         setTotalAmount(0.00)
       }

  }, [bill, tip, numberOfPeople, customTip])

  const handleInputFocus = (setter) => {
    setter('')
  }

  return (
    <div className='flex flex-col h-auto m-5 lg:flex-row max-w-[920px] bg-[var(--primary-white)] mt-20 p-[32px] rounded-3xl gap-10 drop-shadow-2xl' >
      <div className='flex flex-col w-[100%] justyfy-between h-full gap-5'>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-preset-5 text-[var(--primary-gray-500)]">Bill</h1>
        {billError && <p className="space-mono text-red-500 text-[10px]">{billError}</p>}
      </div>
        <Input 
          icon={dollarIcon}
          onChange={handleBillChange}
          onFocus={() => handleInputFocus(setBill)}
          value={bill} />

        <div className='flex flex-wrap gap-2'>
          {tipValues.map((value) => (
            <TipButton
              key={value}
              value={tip}
              onClick={() => handleButtonClick(value)}
              isSelected={selectedButton === value}
          >{value * 100}%</TipButton>  
        ))}
        <CustomButton
          value={customTip}
          onChange={handleCustomTipChange}
          onFocus={() => handleInputFocus(setCustomTip)}
          isSelected={selectedButton === customTip}
        />
        {customTipError && <p className='text-red-500'>{customTipError}</p>}

        </div>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-preset-5 text-[var(--primary-gray-500)]">Number of People</h1>
          {numberOfPeopleError && <p className="space-mono text-[10px] text-red-500">{numberOfPeopleError}</p>}
        </div>
        <Input  
          icon={personIcon}
          onChange={handleNumberOfPeopleChange}
          onFocus={() => handleInputFocus(setNumberOfPeople)}
          value={numberOfPeople} />
      </div>
      
      <div className='flex flex-col justify-between w-[100%] h-full bg-[var(--primary-green-900)] rounded-3xl p-10'>


      <div className='flex flex-col w-full h-auto gap-5'>
        <div className='flex flex-row w-full h-auto items-center justify-between'>
          <div>
            <h2 className='text-preset-5 text-[var(--primary-white)]'>Tip Amount</h2>
            <h2 className='text-preset-6 text-[var(--primary-gray-400)]'>/ person</h2>
          </div>
          <div>
            <h1 className='text-preset-1 text-[var(--primary-green-400)]'>${tipAmount.toFixed(2)}</h1>
          </div>
        </div>
        <div className='flex flex-row w-full h-auto items-center justify-between'>
          <div>
            <h2 className='text-preset-5 text-[var(--primary-white)]'>Total Amount</h2>
            <h2 className='text-preset-6 text-[var(--primary-gray-400)]'>/ person</h2>
          </div>
            <div>
              <h1 className='text-preset-1 text-[var(--primary-green-400)]'>${totalAmount.toFixed(2)}</h1>
            </div>
        </div>
      </div>
          
          <button 
            className={`text-preset-4 text-[var(--primary-green-800)] bg-[var(--primary-green-750)] py-[8px] rounded-sm hover:bg-[var(--primary-green-400)] cursor-pointer ${isActive ? 'text-[var(--primary-white)]':'cursor-not-allowed'}`}
            onClick={handleReset}

          >RESET</button>
        </div>

    </div>
  )
}

export default BillContainer 