import getPriceSymbol from "@/data/getPriceSymbol";
import formatNumber from "@/utils/formatNumber";
import { Portfolio } from "@prisma/client";
import Coin from "../coins/Coin";
import { getMetadataBySymbol } from "@/utils/getIdSymbolMapping";
import Button from "../Button";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";

interface PortfolioViewProps {
    portfolio: Portfolio
}

export default async function PortfolioView({ portfolio }: PortfolioViewProps) {

    const listWithPrices = await Promise.all(portfolio.coins.map(async (coin) => {

        const price = await getPriceSymbol(coin.symbol);
        const metadata = await getMetadataBySymbol(coin.symbol);

        return {
            price,
            metadata,
            ...coin
        }
    }))

    const totalValue = portfolio.fiat + listWithPrices.reduce((acc, curr) => acc + curr.amount * curr.price, 0);

    return (
        <div className="flex justify-center w-full mt-8">
            <div className="w-2/3 flex flex-col gap-4">
                <div className="p-4 dark:bg-slate-900 bg-slate-200 rounded-lg">
                    <div className="flex justify-between p-2">
                        <Link
                            href={"/account/portfolio/deposit"}
                        >
                            <Button>
                                <div className="flex gap-2 items-center group">
                                    <div className="size-6 rotate-180 transition-all duration-200 group-hover:-rotate-90">
                                        <BiArrowBack className="size-full" />
                                    </div>
                                    Deposit
                                </div>
                            </Button>
                        </Link>
                        <div className="text-4xl text-center font-semibold p-2 underline">Portfolio</div>
                        <Link
                            href={"/account/portfolio/withdraw"}
                        >
                            <Button>
                                <div className="flex gap-2 items-center group">
                                    Withdraw
                                    <div className="size-6 -rotate-180 transition-all origin-center duration-200 group-hover:rotate-90">
                                        <BiArrowBack className="size-full" />
                                    </div>
                                </div>
                            </Button>
                        </Link>
                    </div>
                    <div className="flex justify-between p-2">
                        <p className="text-2xl">Fiat stored: ${formatNumber(portfolio.fiat)}</p>
                        <p className="text-2xl">Portfolio Value: ${formatNumber(totalValue)}</p>
                    </div>
                    <div className="">

                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {listWithPrices.map((coin, index) => {
                        //@ts-ignore
                        return (<Coin index={index + 1} coin={{ ...coin.metadata, price: coin.price }} key={index + "coin portfolio"} realtime={false} amount={coin.amount} />)
                    })}
                </div>
            </div>
        </div>
    )

}