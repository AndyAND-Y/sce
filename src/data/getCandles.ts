import CandleType from "@/type/CandleType";

export default async function getCandles(symbol: string, interval: "d" | "m" | "w"): Promise<CandleType[] | null> {
    const functions = {
        "d": "DIGITAL_CURRENCY_DAILY",
        "w": "DIGITAL_CURRENCY_WEEKLY",
        "m": "DIGITAL_CURRENCY_MONTHLY",
    }

    const links = [
        `https://www.alphavantage.co/query?market=CNY&function=${functions[interval]}&symbol=${symbol.toUpperCase()}&apikey=${process.env.ALPHA_VANTAGE_KEY}`,
        `https://www.alphavantage.co/query?market=USD&function=${functions[interval]}&symbol=${symbol.toUpperCase()}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
    ]


    for (let i = 0; i < links.length; ++i) {
        const link = links.at(i);
        if (!link) {
            continue;
        }
        let tries = 3;
        while (tries) {
            try {
                tries--;
                const candles = await fetch(link, { next: { revalidate: 3600 * 12 } })
                    .then((res) => res.json())
                    .then((data) => data[Object.keys(data)[1]])
                    .then((data) => {

                        const dates = Object.keys(data);

                        return dates.map((date) => {

                            const ohlc = data[date];

                            const candle: CandleType = {
                                type: interval,
                                date: date,
                                open: ohlc["1b. open (USD)"],
                                high: ohlc["2b. high (USD)"],
                                low: ohlc["3b. low (USD)"],
                                close: ohlc["4b. close (USD)"],
                            }

                            return candle
                        })
                    })

                return candles;
            }
            catch (error) {
                const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
                await sleep(2000);
                console.log(error);
            }
        }
    }
    return null;
}