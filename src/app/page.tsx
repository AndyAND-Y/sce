import Coins from "@/components/coins/Coins";
import getRecentCoins from "@/data/getRecentCoins";


export default async function Home() {

    const coins = await getRecentCoins();

    return (
        <>
            <div className="flex justify-center">
                <div className="w-1/2 pb-10">
                    <Coins coins={coins}/>
                </div>
            </div>
            <div className="w-1/2 pb-10 mx-auto text-center text-sky-800">
                Made with &hearts; by Group 22
            </div>
        </>

    );
}
