"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";




const PortfolioCoins = ({PortCoin}) => {
    const router = useRouter();







    return (
        <div className="   py-2">
            <li className=" bg-slate-500 py-6 px-8 m-2.5" key={PortCoin.id}>
                <div className=" flex justify-between text-white">
                    <h2 className=" ">{PortCoin.CoinName}</h2>
                    <p>{PortCoin.Amount}</p>
                    <p>{PortCoin.Price}</p>
                    <p>{PortCoin.Total}</p>
                </div>
            </li>
        </div>
    )




}

export default PortfolioCoins