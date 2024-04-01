import CandleType from "@/type/CandleType";
import Chart from "./chart/Chart";
import { getIdBySymbol } from "@/utils/getIdSymbolMapping";
import Image from "next/image";
import ChartLayout from "./chart/ChartLayout";

interface CoinViewProps {
    candles: CandleType[]
    symbol: string,
    interval: "d" | "m" | "w",
}

export default function CoinView({ candles, symbol, interval }: CoinViewProps) {

    const id = getIdBySymbol(symbol);

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-3 w-3/4 gap-4">
                <div className="col-span-3 flex gap-4 flex-col">

                    <div className="shadow-sm bg-slate-200 dark:bg-slate-900 p-4 rounded-lg">
                        <div className="flex justify-between">
                            <div className="flex gap-2 items-center">
                                <Image
                                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
                                    alt={"coin image"}
                                    width={48}
                                    height={48}
                                />
                                <div className="text-3xl font-bold">{symbol.toUpperCase()}</div>
                            </div>
                        </div>
                    </div>

                    <div className="shadow-sm bg-slate-200 dark:bg-slate-900 p-4 rounded-lg">
                        <ChartLayout data={candles} interval={interval} symbol={symbol} />
                    </div>
                </div>
            </div>
        </div>
    )

}   