import CandleType from "@/type/CandleType";
import { getIdBySymbol, getMetadataBySymbol } from "@/utils/getIdSymbolMapping";
import Image from "next/image";
import ChartLayout from "./chart/ChartLayout";

interface CoinViewProps {
    candles: CandleType[]
    symbol: string,
    interval: "d" | "m" | "w",
}

export default function CoinView({ candles, symbol, interval }: CoinViewProps) {

    const id = getIdBySymbol(symbol);
    const metadata = getMetadataBySymbol(symbol);

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-3 w-3/4 gap-4">
                <div className="col-span-3 flex gap-4 flex-col">

                    <div className="shadow-sm bg-slate-200 dark:bg-slate-900 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 justify-center items-center text-center">
                                <Image
                                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
                                    alt={"coin image"}
                                    width={48}
                                    height={48}
                                />
                                <div className="text-3xl font-semibold">{metadata['name']}</div>
                                <div className="opacity-70 text-3xl">{symbol.toUpperCase()}</div>
                            </div>
                            <div className="text-2xl">
                                Creation Date: {new Date(metadata['first_historical_data']).toLocaleString('en-Us', { day: "2-digit", month: "short", year: "numeric" })}
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