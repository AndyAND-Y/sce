import React from 'react'
import PortfolioCoins from './PortfolioCoins'

const CoinList = ({PortCoin}) => {
  return (
    <>
    <div className=' bg-slate-500 text-white flex justify-between px-8 py-6 mx-2.5'>
      <p>Name</p>
      <p>Amount</p>
      <p>Price</p>
      <p>Total</p>
    </div>
    
    
    <ul>
      {
        PortCoin.map(PCoin => (
          <PortfolioCoins key={PCoin.id} PortCoin={PCoin}/>
        ))
      }
    </ul>
    </>
  )
}

export default CoinList