import { symbol } from "zod";

const getMapping = async () => {
    const createMapping = async () => {
        const ans: any = {};
        const response = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?limit=100&sort=cmc_rank", {
            headers: {
                'X-CMC_PRO_API_KEY': process.env.CMC_KEY!,
            },
            cache: "force-cache"
        });
        const coins = await response.json();
        coins.data.forEach((coin: any) => {
            //@ts-ignore
            ans[coin.symbol] = coin;
        });
        return ans;
    };
    return await createMapping();
}

const mapping1 = await getMapping();

export const getIdBySymbol = (symbol: string) => {
    return mapping1[symbol.toUpperCase()].id;
}

export const getMetadataBySymbol = (symbol: string) => {
    return mapping1[symbol.toUpperCase()];
}