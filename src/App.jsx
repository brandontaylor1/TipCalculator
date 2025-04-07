import React from 'react'

import splitterLogo from './assets/logo.svg'

import BillContainer from "./components/BillContainer"

const App = () => {
  return (
    <section className='w-full h-screen flex flex-col items-center justify-center bg-[var(--primary-gray-200)]'>
      <img src={splitterLogo} alt="logo" />
      <BillContainer />
    </section>
  )
}


export default App



