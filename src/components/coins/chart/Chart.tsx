"use client";
import CandleType from "@/type/CandleType";
import formatNumber from "@/utils/formatNumber";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { FaSpinner } from "react-icons/fa";


const ReactApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false })

interface ChartProps {
    data: CandleType[]
}

export default function Chart({ data }: ChartProps) {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState(true);

    const seriesData = data.map((dataPoint) => {
        return {
            x: new Date(dataPoint.date),
            y: [dataPoint.open, dataPoint.high, dataPoint.low, dataPoint.close]
        }
    });

    useEffect(() => {
        setIsLoading(true);
        const observer = new MutationObserver(() => {
            const hasDarkMode = document.documentElement.classList.contains("dark");
            setIsDarkMode(hasDarkMode);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        setIsLoading(false);
        return () => {
            observer.disconnect();
        };
    }, []);

    if (isLoading) {
        return <div className="w-full h-full">
            <div className="flex justify-center items-center h-[500px]">
                <div className="animate-spin">
                    <div className="size-32">
                        <FaSpinner className="size-full" />
                    </div>
                </div>
            </div>
        </div>
    }

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
                    plotOptions: {
                        candlestick: {
                            wick: {
                                useFillColor: true
                            }
                        }
                    },
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
                        strokeDashArray: 5,
                        borderColor: isDarkMode ? "#e2e8f0" : "#1e293b",
                        xaxis: {
                            lines: {
                                show: false,
                            }
                        },
                        yaxis: {
                            lines: {
                                show: true,
                            }
                        }
                    },
                    xaxis: {
                        type: "category",
                        labels: {
                            style: {
                                colors: isDarkMode ? "white" : "black",
                            },
                            rotateAlways: true,
                            rotate: 0,
                            formatter: function (value) {

                                function formatDate(value: string) {
                                    const date = new Date(value);
                                    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: "2-digit" });
                                }

                                return formatDate(value);
                            },
                        },
                        categories: data.reverse().map(dataPoint => dataPoint.date),
                        tickAmount: seriesData.length < 100 ? Math.ceil(seriesData.length / 3) : Math.ceil(seriesData.length / 10),
                    },
                    yaxis: {
                        opposite: true,
                        labels: {
                            style: {
                                colors: isDarkMode ? "white" : "black",
                                fontSize: "14",
                                fontWeight: "bold"
                            }
                        },
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