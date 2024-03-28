"use client";
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LogOutPage() {

    const router = useRouter();

    useEffect(() => {
        signOut({ redirect: false })
            .then(() => {
                router.push("/")
                router.refresh()
            })
    }, [router])

    return null
}