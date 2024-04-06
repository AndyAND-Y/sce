import CoinView from "@/components/coins/CoinView";
import getCandles from "@/data/getCandles";
import { getMetadataBySymbol } from "@/utils/getIdSymbolMapping";

interface MarketDataProps {
    params: {
        symbol: string
    },
    searchParams: { [key: string]: string | string[] | undefined }
}


export default async function MarketData({ params, searchParams }: MarketDataProps) {

    const symbol = params.symbol;
    let interval: "d" | "m" | "w" = "d";

    if (searchParams['interval'] && !Array.isArray(searchParams['interval']) && ['d', 'm', 'w'].includes(searchParams['interval'])) {
        // @ts-ignore
        interval = searchParams['interval'];
    }


    const intervalSliceIndicies = {
        "d": 100,
        "w": 40,
        "m": 30,
    }

    const candles = (await getCandles(symbol, interval))?.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

    if (!candles) {
        return;
    }

    const sliceIndex = Math.min(intervalSliceIndicies[interval], candles.length);

    const metadata = await getMetadataBySymbol(symbol);

    // return

    return <CoinView candles={candles.slice(0, sliceIndex)} interval={interval} symbol={symbol} metadata={metadata} />

}