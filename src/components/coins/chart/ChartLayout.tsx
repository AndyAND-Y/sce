import CandleType from "@/type/CandleType";
import Chart from "./Chart";
import CoinPrice from "../CoinPrice";
import IntervalButton from "./IntervalButton";
import { Suspense } from "react";

interface ChartLayoutProps {
    data: CandleType[]
    symbol: string,
    interval: "d" | "m" | "w"
}

export default function ChartLayout({ data, symbol, interval }: ChartLayoutProps) {

    return (

        <div className="flex flex-col">

            <div className="text-2xl pb-4 border-b dark:border-slate-300 border-slate-700">

                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <p>Current Price: </p>
                        <CoinPrice symbol={symbol} initialPrice={data[0].close} />
                    </div>
                    <div className="flex gap-4">
                        {["d", "w", "m"].map((value, index) => {
                            // @ts-ignore
                            return <IntervalButton value={value} selected={value === interval} key={"interval_btn" + index} />
                        })}
                    </div>
                </div>

            </div>
            <div className="h-[500px]">
                <Suspense fallback={<div className="h-[500px]">Loading</div>}>
                    <Chart data={data} />
                </Suspense>
            </div>
        </div>
    )

}
