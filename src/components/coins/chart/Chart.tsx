"use client";
import CandleType from "@/type/CandleType";
import formatNumber from "@/utils/formatNumber";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";


const ReactApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false })

interface ChartProps {
    data: CandleType[]
}

export default function Chart({ data }: ChartProps) {

    const seriesData = useMemo(() => data.map((dataPoint) => {
        return {
            x: new Date(dataPoint.date),
            y: [dataPoint.open, dataPoint.high, dataPoint.low, dataPoint.close]
        }
    }), [data])

    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const hasDarkMode = document.documentElement.classList.contains("dark");
            setIsDarkMode(hasDarkMode);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => {
            observer.disconnect();
        };
    }, []);


    return (
        <div className="w-full h-full">
            <ReactApexCharts
                height={500}
                width={"100%"}
                type="candlestick"

                series={[{
                    data: seriesData
                }]}

                options={{
                    chart: {
                        toolbar: {
                            show: false
                        },
                        zoom: {
                            enabled: false,
                        },
                        type: "candlestick",
                        height: 500,
                    },
                    grid: {
                        show: false,
                    },
                    xaxis: {
                        type: "datetime",
                        labels: {
                            style: {
                                colors: isDarkMode ? "white" : "black"
                            }
                        }
                    },
                    yaxis: {
                        opposite: true,
                        labels: {
                            style: {
                                colors: isDarkMode ? "white" : "black",
                                fontSize: "14",
                                fontWeight: "bold"
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        followCursor: true,
                        custom: function ({ dataPointIndex, w }) {

                            return '<div class="bg-slate-200 border-2 rounded-md border-black backdrop-brightness-50 p-4 flex flex-col gap-2 w-[150px] dark:bg-slate-900 dark:text-white">' +
                                '<span class="w-4">' +
                                'Open: ' +
                                formatNumber(w.globals.seriesCandleO[0][dataPointIndex]) +
                                '</span>' +
                                '<span class="w-4">' +
                                'High: ' +
                                formatNumber(w.globals.seriesCandleH[0][dataPointIndex]) +
                                '</span>' +
                                '<span class="w-4">' +
                                'Low: ' +
                                formatNumber(w.globals.seriesCandleL[0][dataPointIndex]) +
                                '</span>' +
                                '<span class="w-4">' +
                                'Close: ' +
                                formatNumber(w.globals.seriesCandleC[0][dataPointIndex]) +
                                '</span>' +
                                "</div>"

                        }
                    }
                }}

            />
        </div>
    )

}