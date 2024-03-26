import React from 'react'

import AddCoin from '@/components/addCoin'
import CoinList from '@/components/coinList'

const Portfolio = () => {
  
  
  
  return (
    <>
    
    
    <AddCoin />
    <Home />
    </>
    
    )
  }
  
  export default Portfolio
  
  
async function getData() {
  const res = await fetch("http://localhost:3000/api/post", {cache: 'no-store'})

  if(!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json();


}

const Home = async () => {
  const coins = await getData();
  // console.log("This is the data below")
  // console.log(coins)
  // console.log("This is the data above")

  return(
    <main className=' bg-gray-600 h-screen'>
      {/* <section className=' bg-red-600'> */}
        <CoinList PortCoin={coins}/>
      {/* </section> */}
    </main>
  )
}