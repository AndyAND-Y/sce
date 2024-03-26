import ThemeButton from "../ThemeButton";


export default function Navbar() {

    return (
        <div className="h-16 p-4">
            <div className="bg-slate-300 dark:bg-slate-900 rounded-lg p-1 shadow-lg shadow-slate-400 dark:shadow-slate-700 border-x-2 border-black dark:border-white">
                <div className="flex justify-between px-1">
                    <h1 className="text-lg p-2 font-semibold">Secure Crypto Exchange</h1>
                    <ThemeButton />
                </div>
            </div>
        </div>
    )

}