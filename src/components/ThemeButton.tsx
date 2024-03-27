"use client";

import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeButton: React.FC = () => {

    const [theme, setTheme] = useState<"dark" | "light">("light");

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
        <div className="p-1 flex justify-center items-center">
            <div
                className="size-8 text-black dark:text-white transition-all"
                onClick={handleThemeChange}
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