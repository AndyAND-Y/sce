"use client";

import DepositSchema from "@/schemas/depositSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Container from "../Container";
import Button from "../Button";
import deposit from "@/actions/deposit";

export default function DepositForm() {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const router = useRouter();

    const form = useForm<z.infer<typeof DepositSchema>>({
        resolver: zodResolver(DepositSchema),
        defaultValues: {
            cardNumber: "",
            expirationDate: "",
            name: "",
            securityCode: ""

        }
    })

    const onSubmit = (values: z.infer<typeof DepositSchema>) => {
        setError("");
        setSuccess("");
        deposit(values)
            .then((data) => {

                if (data?.error) {
                    form.reset()
                    setError(data.error);
                }

                if (data?.success) {
                    form.reset()
                    setSuccess(data.success);

                    router.push("/account/portfolio")
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

                    <h1 className="text-xl font-medium mb-4 text-center">Deposit</h1>

                    <form className=" flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>

                        <div className="flex flex-col gap-1">
                            <label>Card number:</label>
                            <input className="rounded dark:bg-slate-700 p-1" {...form.register("cardNumber")} />
                            <p> {form.formState.errors.cardNumber?.message} </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>Expiration Date:</label>
                            <input className="rounded dark:bg-slate-700 p-1" {...form.register("expirationDate")} />
                            <p> {form.formState.errors.expirationDate?.message} </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>CVC/CVV:</label>
                            <input className="rounded dark:bg-slate-700 p-1" {...form.register("securityCode")} />
                            <p> {form.formState.errors.securityCode?.message} </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label>Name on card:</label>
                            <input className="rounded dark:bg-slate-700 p-1" {...form.register("name")} />
                            <p> {form.formState.errors.name?.message} </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label>Fiat Amount:</label>
                            <input className="rounded dark:bg-slate-700 p-1" onChange={(ev) => { form.setValue("amount", Number(ev.target.value)) }} />
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