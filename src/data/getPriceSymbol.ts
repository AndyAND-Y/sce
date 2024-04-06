
export default async function getPriceSymbol(symbol: string) {

    const link = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=" + symbol.toUpperCase();

    return await fetch(link, {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.CMC_KEY!,
        },
        next: {
            revalidate: 60,
        }
    })
        .then(res => res.json())
        .then(res => Number(res.data[symbol.toUpperCase()][0].quote["USD"].price))
}