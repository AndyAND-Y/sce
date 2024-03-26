"use client";
import RegisterSchema from "@/schemas/registerSchema";
import { useState } from "react"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


{/* <div className="size-16 bg-cyan-500 dark:bg-cyan-400 rounded-full">

        </div> */}

export default function RegisterForm() {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    })


    return (

        <div className="p-4 rounded-lg bg-slate-300 bg:dark ">

            <h1>Register</h1>

            <form>

            </form>
        </div>

    )
}