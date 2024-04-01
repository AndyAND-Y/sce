"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IntervalButton({ value, selected }: { selected: boolean, value: "d" | "m" | "w" }) {


    const valueMapping = {
        "d": "Daily",
        "w": "Weekly",
        "m": "Monthly",
    }

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
    }, [pathname, searchParams])

    const handleIntervalChange = () => {
        if (selected) {
            return;
        }
        router.replace(pathname + "?interval=" + value)
        router.refresh();
    }

    return (
        <div className="">
            <button
                className={
                    `p-2 dark:bg-slate-800 bg-slate-300 shadow-md shadow-slate-400 dark:shadow-slate-950 rounded-lg hover:scale-110 transition-all duration-200
                    ${!selected ? "" : "border"}
                    `
                }
                onClick={handleIntervalChange}
            >{valueMapping[value]}</button>
        </div>
    )

}