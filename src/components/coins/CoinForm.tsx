"use client";

import order from "@/actions/order";
import OrderSchema from "@/schemas/orderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Container from "../Container";
import Button from "../Button";

interface CoinFormProps {
    symbol: string
}

export default function CoinForm({ symbol }: CoinFormProps) {

    const [isBuySide, setIsBuySide] = useState(true);

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const router = useRouter();

    const form = useForm<z.infer<typeof OrderSchema>>({
        resolver: zodResolver(OrderSchema),
        defaultValues: {
            quantity: 1,
            side: isBuySide ? "BUY" : "SELL",
        },

    })

    const onSubmit = (values: z.infer<typeof OrderSchema>) => {
        setError("");
        setSuccess("");

        order(values, symbol)
            .then((data) => {
                if (data?.error) {
                    setError(data.error)
                }

                if (data?.success) {
                    setSuccess(data.success)
                    router.refresh();
                }
            })
            .catch((error) => {
                setError("Something went wrong!");
            })
    }


    return (
        <div className="flex items-center h-full">
            <div className="h-2/3 w-full">
                <Container>
                    <div className="flex flex-col p-4 gap-4 h-full w-full">
                        <h1 className="text-2xl font-semibold mb-4 text-center">Create Order</h1>
                        <form className="flex flex-col gap-6 justify-between h-full" onSubmit={form.handleSubmit(onSubmit)}>

                            <div className="flex gap-0 w-full">
                                <div
                                    className={`p-6 text-3xl text-center ${isBuySide ? "bg-red-500/60" : "bg-red-500/90"} hover:bg-red-500 shadow-inner w-1/2 rounded-full rounded-r-none duration-200 transition-all`}
                                    onClick={() => {
                                        setIsBuySide(false)
                                        form.setValue("side", "SELL");
                                    }}
                                >
                                    Sell
                                </div>
                                <div
                                    className={`p-6 text-3xl text-center ${!isBuySide ? "bg-green-500/60" : "bg-green-500/90"} hover:bg-green-500 shadow-inner w-1/2 rounded-full rounded-l-none duration-200 transition-all`}
                                    onClick={() => {
                                        setIsBuySide(true)
                                        form.setValue("side", "BUY");
                                    }}
                                >
                                    Buy
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-2xl font-medium text-center">Amount</label>
                                {/* @ts-ignore */}
                                <input
                                    className="rounded dark:bg-slate-700 p-1 w-full h-12 text-xl pl-4"
                                    onChange={(e) => form.setValue("quantity", parseFloat(e.target.value))}
                                />
                                <p> {form.formState.errors.quantity?.message} </p>
                            </div>
                            <Button
                                type="submit"
                            >
                                <div className="grid">

                                    <div
                                        className={`col-start-1 row-start-1 ${!isBuySide ? "opacity-0" : "opacity-100"} transform ${!isBuySide ? "translate-y-[-50px]" : "translate-y-0"} transition-all duration-200`}
                                    >
                                        {isBuySide && "Buy"}
                                    </div>



                                    <div
                                        className={`col-start-1 row-start-1 ${isBuySide ? "opacity-0" : "opacity-100"} transform ${isBuySide ? "translate-y-[-50px]" : "translate-y-0"} transition-all duration-200`}
                                    >
                                        {!isBuySide && "Sell"}
                                    </div>

                                </div>

                            </Button>
                        </form>
                    </div>
                </Container >
                <div className="p-4 ">
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500 ">{success}</p>}
                </div>
            </div>
        </div >
    )

}