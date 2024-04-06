
export default async function getPriceSymbol(symbol: string) {

    const link =
        "https://api.binance.com/api/v3/ticker/price?symbol=" +
        symbol.toUpperCase() +
        "USDT";

    return await fetch(link, {
        next: {
            revalidate: 10,
        }
    })
        .then(res => res.json())
        .then(res => { console.log(res); return res })
        .then(data => Number(data.price) as number)

}