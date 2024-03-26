import getCurrentUser from "@/data/getCurrentUser";
import Container from "../Container";
import ThemeButton from "../ThemeButton";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";


export default async function Navbar() {

    const currentUser = await getCurrentUser();
    const isLoggedIn = currentUser !== null;

    console.log(isLoggedIn)

    return (
        <div className="w-full p-4">
            <Container>
                <div className="flex justify-between p-1">
                    <h1 className="text-2xl p-2 font-semibold">Secure Crypto Exchange</h1>
                    <div className="flex gap-1">

                        {isLoggedIn && (
                            <div className="p-2 flex justify-center items-center">
                                <Link
                                    className="size-8 text-black dark:text-white transition-all"
                                    href={'/account'}
                                >
                                    <MdAccountCircle />
                                </Link>
                            </div>
                        )}
                        <ThemeButton />
                    </div>
                </div>
            </Container>
        </div>
    )

}