import Coins from "@/components/coins/Coins";
import getRecentCoins from "@/data/getRecentCoins";


export default async function Home() {

    const coins = await getRecentCoins();

    return (
        <div className="flex justify-center">
            <div className="w-1/2">
                <Coins coins={coins} />
            </div>
        </div>
    );
}
