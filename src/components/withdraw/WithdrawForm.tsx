"use client";

import withdraw from "@/actions/withdraw";
import WithdrawSchema from "@/schemas/withdrawSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Container from "../Container";
import Button from "../Button";

export default function WithdrawForm() {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const router = useRouter();

    const form = useForm<z.infer<typeof WithdrawSchema>>({
        resolver: zodResolver(WithdrawSchema),
    })

    const onSubmit = (values: z.infer<typeof WithdrawSchema>) => {
        setError("");
        setSuccess("");
        withdraw(values)
            .then((data) => {

                if (data?.error) {
                    form.reset()
                    setError(data.error);
                }

                if (data?.success) {
                    form.reset()
                    setSuccess(data.success);
                    router.push('/account/portfolio')
                    router.refresh()
                }

            })
            .catch((error) => {
                setError("Something went wrong!")
                console.log(error)
            })
    }


    return (

        <div className="">
            <Container>
                <div className="p-4 flex flex-col">

                    <h1 className="text-xl font-medium mb-4 text-center">Withdraw</h1>

                    <form className=" flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>

                        <div className="flex flex-col gap-1">
                            <label>Account Number:</label>
                            <input className="rounded dark:bg-slate-700 p-1" {...form.register("accountNumber")} />
                            <p> {form.formState.errors.accountNumber?.message} </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>Sort Code:</label>
                            <input className="rounded dark:bg-slate-700 p-1" {...form.register("sortCode")} />
                            <p> {form.formState.errors.sortCode?.message} </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>Holder Name:</label>
                            <input className="rounded dark:bg-slate-700 p-1" {...form.register("holderName")} />
                            <p> {form.formState.errors.holderName?.message} </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label>Fiat Amount:</label>
                            <input className="rounded dark:bg-slate-700 p-1" onChange={(ev) => {
                                form.setValue("amount", parseFloat(ev.target.value))
                            }} />
                            <p> {form.formState.errors.amount?.message} </p>
                        </div>


                        <Button
                            type="submit"
                        >
                            Submit
                        </Button>
                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}
                    </form>
                </div>
            </Container>
        </div>

    )
}