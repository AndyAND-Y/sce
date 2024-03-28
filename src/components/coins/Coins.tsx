import CoinType from "@/type/CoinType"
import Coin from "./Coin"

interface CoinsProps {
    coins: CoinType[]
}

export default function Coins({ coins }: CoinsProps) {

    return (
        <div className="flex flex-col gap-2">
            {coins.map(
                (coin, index) => (
                    <Coin coin={coin} index={index + 1} key={index} />
                )
            )}
        </div>
    )
}