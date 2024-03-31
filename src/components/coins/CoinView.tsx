import CandleType from "@/type/CandleType";
import Chart from "./chart/Chart";

interface CoinViewProps {
    candles: CandleType[]
    symbol: string,
    interval: string,
}

export default function CoinView({ candles, symbol, interval }: CoinViewProps) {

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-3 w-3/4 gap-4">
                <div className="col-span-3 shadow-sm bg-slate-200 dark:bg-slate-900 p-4 rounded-lg">
                    <Chart data={candles} />
                </div>
            </div>
        </div>
    )

}   