import CoinType from "@/type/CoinType";
import CoinPrice from "./CoinPrice";
import Link from "next/link";
import Image from "next/image";

interface CoinProps {
    coin: CoinType
    index: number,
}



export default function Coin({ coin, index }: CoinProps) {

    return (
        <Link
            href={"/coins/" + coin.symbol}
        >
            <div className="flex justify-between items-center p-4 rounded-lg shadow-sm hover:shadow bg-slate-200 dark:bg-slate-900 hover:bg-slate-300 hover:dark:bg-slate-700 transition-all duration-200">
                <div className="flex gap-4 w-2/5 sm:w-2/3 items-center">
                    <div className="w-4">
                        {index && (index)}
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 items-center w-full gap-2">
                        <Image
                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
                            alt={coin.name}
                            width={32}
                            height={32}
                            className="col-span-1"
                        />
                        <div className="font-semibold col-span-2 truncate">
                            {coin.name}
                        </div>
                        <div className="text-slate-600 dark:text-slate-400 col-span-1 hidden md:block">
                            {coin.symbol}
                        </div>
                    </div>
                </div>
                <div>
                    <CoinPrice
                        symbol={coin.symbol}
                        initialPrice={coin.price}
                    />
                </div>
            </div>
        </Link>
    )

}