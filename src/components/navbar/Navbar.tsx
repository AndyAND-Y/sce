import ThemeButton from "../ThemeButton";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import Button from "../Button";


export default async function Navbar() {

    return (
        <div className="w-full p-4 fixed top-0 h-28">
            <div className="bg-slate-300/70 dark:bg-slate-900/70 backdrop-blur rounded-lg p-1 shadow-md shadow-slate-400 dark:shadow-slate-700 border-x-2 border-black dark:border-white">
                <div className="flex justify-between p-1 items-center">
                    <Link
                        href={'/'}
                    >
                        <h1 className="text-2xl p-2 font-semibold">Secure Crypto Exchange</h1>
                    </Link>
                    <div className="flex gap-2 items-center ">

                        <Link
                            href={'/account'}
                        >
                            <Button>
                                <div className="flex items-center gap-1">
                                    <div className="flex justify-center items-center">
                                        <div className="size-8">
                                            <MdAccountCircle className="size-full" />
                                        </div>
                                    </div>
                                    <div>Account</div>
                                </div>
                            </Button>
                        </Link>
                        <ThemeButton />
                    </div>
                </div>
            </div>
        </div >
    )

}