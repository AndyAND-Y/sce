"use client";

import CandleStick from "@/types/CandleStick";
import Timeframe from "@/types/Timeframe";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartWindowProps {
    symbol: string,
    timeframe: Timeframe,
    data: CandleStick[],
}

export default function ChartWindow({ data, symbol, timeframe }: ChartWindowProps) {

    const [lastDataPoint, setLastDataPoint] = useState<CandleStick | null>();

    const [chartOptions, setChartOptions] = useState<any>({
        chart: {
            toolbar: {

            },
            type: "candlestick",
            height: 350,
            events: {
                beforeZoom: (chartContext: any, { xaxis }: { xaxis: { min: number; max: number }; }) => {
                    // Update the chart options with the new zoomed range
                    console.log(xaxis.min, xaxis.max);

                    setChartOptions({
                        ...chartOptions,
                        xaxis: {
                            ...chartOptions.xaxis,
                            min: xaxis.min,
                            max: xaxis.max
                        }
                    });
                }
            }
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            opposite: true
        }
    });

    const formatDataPoint = (candle: CandleStick) => ({
        x: candle.time,
        y: [candle.openPrice, candle.highPrice, candle.lowPrice, candle.closePrice]
    });

    const seriesData = useMemo(() => data.map((dataPoint) => formatDataPoint(dataPoint)), [data]);


    useEffect(() => {
        const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}usdt@kline_${timeframe}`);

        socket.addEventListener('open', (event) => {
            console.log('WebSocket connection opened:', event);
        });

        // Event listener for incoming messages
        socket.addEventListener('message', (event) => {
            // Parse the incoming JSON data
            const newData = JSON.parse(event.data);

            const newCandle: CandleStick = {
                time: newData.E,
                openPrice: newData.k.o,
                highPrice: newData.k.h,
                lowPrice: newData.k.l,
                closePrice: newData.k.c,
                isClosed: newData.k.x
            }

            setLastDataPoint(newCandle);
        });

        // Event listener for when the connection is closed
        socket.addEventListener('close', (event) => {
            console.log('WebSocket connection closed:', event);
        });

        return () => {
            socket.close();
        }

    }, [symbol, timeframe])


    const chartComp = useMemo(() => <ReactApexChart
        height={500}
        width={"100%"}
        type="candlestick"

        series={[{
            data: lastDataPoint ? [...seriesData, formatDataPoint(lastDataPoint)] : seriesData
        }]}

        options={chartOptions}
    />, [chartOptions, lastDataPoint, seriesData])


    return <div className="w-full h-full">
        {chartComp}
    </div>

}
