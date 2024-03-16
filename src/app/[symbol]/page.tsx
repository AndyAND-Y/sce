import ChartLayout from "@/component/Chart/ChartLayout";
import { Suspense } from "react";


export default async function TradingPage({ params }: { params: { symbol: string } }) {

    const symbol = params.symbol;

    return (

        <div className="h-screen w-full flex justify-center items-center">
            <div
                className="flex flex-col w-2/3 h-2/3"
            >
                <div className="flex justify-between">
                    <div
                        className="text-2xl"
                    >
                        {symbol}
                    </div>
                    <div
                        className="flex gap-2"
                    >
                        <button>1d</button>
                        <button>1M</button>
                        <button>1w</button>
                    </div>
                </div>
                <Suspense
                    fallback={<div>Loading...</div>}
                >

                    <ChartLayout symbol={symbol} timeframe="1d" />
                </Suspense>
            </div>
        </div>
    )

}