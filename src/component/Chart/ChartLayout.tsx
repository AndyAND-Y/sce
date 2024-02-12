import CandleStick from "@/types/CandleStick";
import Timeframe from "@/types/Timeframe"
import ChartWindow from "./ChartWindow";

interface ChartLayoutProps {
    symbol: string,
    timeframe: Timeframe,
}

export default async function ChartLayout({ symbol, timeframe }: ChartLayoutProps) {

    const initialData: CandleStick[] = await fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol.toUpperCase()}&market=CNY&apikey=${process.env.ALPHA_VANTAGE_KEY}`, {
        next: {
            revalidate: 1000 * 60 * 60,
        }
    })
        .then((data) => data.json())
        .then((data) => {

            const series = data["Time Series (Digital Currency Daily)"];
            const dates = Object.keys(series);

            const candleSticks: CandleStick[] = dates.map((date, index) => {

                const candleData = series[date];

                const [year, month, day]: number[] = date.split("-").map((el) => {
                    return Number(el);
                })

                const time = new Date(year, month - 1, day).getTime();

                return {
                    closePrice: candleData["4b. close (USD)"],
                    highPrice: candleData["2b. high (USD)"],
                    lowPrice: candleData["3b. low (USD)"],
                    openPrice: candleData["1b. open (USD)"],
                    isClosed: true,
                    time
                }
            }).filter((el, index) => index < 100);

            return candleSticks;

        })

    return <ChartWindow data={initialData} symbol={symbol} timeframe={timeframe} />
    // return <div>test</div>
}