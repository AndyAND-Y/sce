import CoinType from "@/type/CoinType";

export default async function getRecentCoins(limit: number = 30): Promise<CoinType[]> {


    const coins = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.CMC_KEY!,
        }
    })
        .then((res) => res.json())
        .then((data) => data.data)
        .then((coinsRaw) => {

            const coins = coinsRaw.map((coinRaw: any) => {
                const coin: CoinType = {
                    id: coinRaw.id,
                    symbol: coinRaw.symbol,
                    name: coinRaw.name,
                    cmcRank: coinRaw.cmc_rank,
                    marketCap: coinRaw.quote.USD.market_cap,
                    price: coinRaw.quote.USD.price,
                }
                return coin;
            }) as CoinType[];
            return coins;
        })
    return coins.slice(0, limit);
}