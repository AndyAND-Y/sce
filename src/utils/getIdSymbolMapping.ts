let instance: any | null = null;

const getMapping = async () => {
    if (!instance) {

        try {
            const ans = {};
            const response = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?limit=100&sort=cmc_rank", {
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.CMC_KEY!,
                },
                cache: "force-cache"
            });
            const coins = await response.json();
            coins.data.forEach((coin: any) => {
                // @ts-ignore
                ans[coin.symbol] = coin;
            });
            instance = ans;
        } catch (error) {
            console.error("Error fetching mapping:", error);
        }
    }

    return instance;
};

export const getMetadataBySymbol = async (symbol: string) => {
    // return;
    const mapping = await getMapping();
    return mapping[symbol.toUpperCase()];
};
