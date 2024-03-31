"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeButton: React.FC = () => {

    const [theme, setTheme] = useState<"dark" | "light">("dark");

    const handleThemeChange = () => {

        const hasDarkMode = document.documentElement.classList.contains("dark");

        if (hasDarkMode) {
            document.documentElement.classList.remove("dark");
            setTheme("light");
            return;
        }

        document.documentElement.classList.add("dark");
        setTheme("dark");

    }

    return (
        <div className="flex justify-center items-center p-2 text-lg bg-slate-300 dark:bg-slate-800 rounded-lg border dark:border-white border-black hover:shadow-inner hover:dark:bg-slate-900 hover:bg-slate-400 transition-all duration-200"
            onClick={handleThemeChange}
        >
            <div
                className="size-8 text-black dark:text-white transition-all"
            >
                {
                    theme === "dark" ?
                        <FaMoon className="h-full w-full before:scale-0 scale-100 duration-200" /> :
                        <FaSun className="h-full w-full before:scale-0 scale-100 duration-200" />
                }
            </div>
        </div>
    )

}

export default ThemeButton;