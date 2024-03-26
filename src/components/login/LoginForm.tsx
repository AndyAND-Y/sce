"use client";
import RegisterSchema from "@/schemas/registerSchema";
import { useState } from "react"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "../Container";
import login from "@/actions/login";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginSchema from "@/schemas/loginSchema";
import { signIn } from "next-auth/react";

export default function RegisterForm() {

    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const router = useRouter();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        login(values)
            .then((data) => {

                if (data?.error) {
                    form.reset()
                    setError(data.error);
                }

                if (data?.success) {
                    form.reset()
                    setSuccess(data.success);
                }

                if (data?.twoFactor) {
                    setShowTwoFactor(true);
                }
                return data
            })
            .catch(() => setError("Something went wrong!"))
            .then(() => {
                if (showTwoFactor) {
                    signIn("credentials", {
                        ...values,
                        redirect: false
                    }).then(() => {
                        router.push('/')
                        router.refresh();
                    })
                }
            })
    }


    return (

        <div className="">
            <Container>
                <div className="p-4 flex flex-col">

                    <h1 className="text-xl font-medium mb-4 text-center">Login</h1>

                    <form className=" flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>

                        {
                            showTwoFactor && (
                                <div className="flex flex-col gap-1">
                                    <label>Code:</label>
                                    <input className="rounded dark:bg-slate-700 p-1" {...form.register("code")} />
                                    <p> {form.formState.errors.code?.message} </p>
                                </div>
                            )

                        }
                        {
                            !showTwoFactor && (
                                <>
                                    <div className="flex flex-col gap-1">
                                        <label>Email:</label>
                                        <input className="rounded dark:bg-slate-700 p-1" {...form.register("email")} />
                                        <p> {form.formState.errors.email?.message} </p>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label>Password:</label>
                                        <input type="password" className="rounded dark:bg-slate-700 p-1" {...form.register("password")} />
                                        <p className=""> {form.formState.errors.password?.message} </p>
                                    </div>
                                </>
                            )
                        }
                        <button
                            className="p-1 text-lg bg-slate-400 dark:bg-slate-800 rounded-lg border dark:border-white border-black hover:shadow-inner hover:dark:bg-slate-900 hover:bg-slate-500 transition-all duration-200"
                            type="submit"
                        >
                            {showTwoFactor ? "Confirm" : "Login"}
                        </button>
                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}
                    </form>

                    <div className="flex justify-center mt-4">
                        <Link
                            href={"/register"}
                        >
                            Don&apos;t have an account?
                        </Link>
                    </div>
                </div>
            </Container>
        </div>

    )
}
