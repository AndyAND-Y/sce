"use client";
import formatNumber from "@/utils/formatNumber";
import { useEffect, useMemo, useState } from "react"

interface CoinPriceProps {
    symbol: string
    initialPrice: number,
}

export default function CoinPrice({ symbol, initialPrice }: CoinPriceProps) {

    const [price, setPrice] = useState(initialPrice);
    const [lastPrice, setLastPrice] = useState(initialPrice);

    useEffect(() => {
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

            setPrice(
                (lastPrice) => {
                    setLastPrice(lastPrice);
                    return Number(newCandle.openPrice)
                }
            );
        });


        return () => {
            socket.close();
        }

    }, [symbol])

    return (
        <div
            className="flex flex-nowrap gap-[2px] text-lg"
        >
            <p>
                $
            </p>
            <p>
                {formatNumber(price)}
            </p>
        </div>
    )

}
