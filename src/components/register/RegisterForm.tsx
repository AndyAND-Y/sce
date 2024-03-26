"use client";
import RegisterSchema from "@/schemas/registerSchema";
import { useState } from "react"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "../Container";
import register from "@/actions/register";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const router = useRouter();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        register(values)
            .then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
            .then(() => {
                router.push("/");
            })
    }


    return (

        <div className="">
            <Container>
                <div className="p-4 flex flex-col">

                    <h1 className="text-xl font-medium mb-4 text-center">Create An Account</h1>

                    <form className=" flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>

                        <div className="flex flex-col gap-1">
                            <label>Name:</label>
                            <input className="rounded dark:bg-slate-700 p-1" {...form.register("name")} />
                            <p> {form.formState.errors.name?.message} </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label>Email:</label>
                            <input className="rounded dark:bg-slate-700 p-1" {...form.register("email")} />
                            <p> {form.formState.errors.email?.message} </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label>Password:</label>
                            <input className="rounded dark:bg-slate-700 p-1" {...form.register("password")} />
                            <p className=""> {form.formState.errors.password?.message} </p>
                        </div>

                        <button
                            className="p-1 text-lg bg-slate-400 dark:bg-slate-800 rounded-lg border dark:border-white border-black hover:shadow-inner hover:dark:bg-slate-900 hover:bg-slate-500 transition-all duration-200"
                            type="submit"
                        >
                            Register
                        </button>
                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}
                    </form>

                    <div className="flex justify-center mt-4">
                        <Link
                            href={"/login"}
                        >
                            Already have an account?
                        </Link>
                    </div>
                </div>
            </Container>
        </div>

    )
}