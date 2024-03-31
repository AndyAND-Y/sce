

type CandleType = {
    type: "d" | "w" | "m",
    open: number,
    close: number,
    low: number,
    high: number,
    date: string,
}

export default CandleType;