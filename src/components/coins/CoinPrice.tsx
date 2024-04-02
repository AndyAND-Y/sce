"use client";
import formatNumber from "@/utils/formatNumber";
import { useEffect, useState } from "react"

interface CoinPriceProps {
    symbol: string
    initialPrice: number,
    showProcent?: boolean,
    realtime?: boolean,
}

export default function CoinPrice({ symbol, initialPrice, showProcent = false, realtime = true }: CoinPriceProps) {

    const [price, setPrice] = useState(initialPrice);
    const [isLoading, setIsLoading] = useState(showProcent);

    const procent = (price / initialPrice - 1) * 100;

    /// init * (1+p) = price

    const procentTextUp = (
        <div className="p-2 bg-green-500/80 backdrop-blur rounded-lg shadow-sm shadow-green-300 dark:shadow-green-600  hover:bg-green-500 hover:backdrop-blur-0 duration-200">
            <div className="">
                {procent.toFixed(2)}%
            </div>
        </div>
    )

    const procentTextDown = (
        <div className="p-2 bg-red-500/80 backdrop-blur rounded-lg shadow-sm shadow-red-300 dark:shadow-red-600  hover:bg-red-500 hover:backdrop-blur-0 duration-200">
            <div className="">
                {procent.toFixed(2)}%
            </div>
        </div>
    )






    useEffect(() => {
        if (!realtime) {
            return;
        }
        const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@kline_1m`);

        // Event listener for incoming messages
        socket.addEventListener('message', (event) => {
            // Parse the incoming JSON data
            const newData = JSON.parse(event.data);

            const newCandle = {
                time: newData.E,
                openPrice: newData.k.o,
                highPrice: newData.k.h,
                lowPrice: newData.k.l,
                closePrice: newData.k.c,
                isClosed: newData.k.x
            }

            setPrice(Number(newCandle.closePrice));
            setIsLoading(false);
        });


        return () => {
            socket.close();
        }

    }, [realtime, symbol])

    if (isLoading) {
        return <p className="animate-pulse">{formatNumber(initialPrice)}</p>
    }

    return (
        <div className="flex gap-2 items-center">
            <div
                className="flex flex-nowrap gap-[2px]"
            >
                <p>
                    ${formatNumber(price)}
                </p>
            </div>
            {(showProcent === true) && (procent >= 0 ? procentTextUp : procentTextDown)}
        </div>
    )

}
