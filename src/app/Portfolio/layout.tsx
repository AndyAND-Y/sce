import React from 'react'

const PortfolioLayout = ({children }: {children: React.ReactNode}) => {
  return (
    <div>
        <nav className=' bg-slate-700 text-white overflow-hidden'>
          <a className='float-left text-center p-3.5'> Home</a>
          <a className='float-left text-center p-3.5'>deposit</a>
          <a className='float-left text-center p-3.5'>Withdraw</a>
          <a className='float-left text-center p-3.5'>Sign Out</a>
        </nav>
        {children}
    </div>
  )
}

export default PortfolioLayout