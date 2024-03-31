"use client";
import createTicket from "@/actions/createTicket";
import CreateTicketSchema from "@/schemas/createTicketSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Container from "../Container";
import Button from "../Button";


export default function CreateTicketForm() {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const router = useRouter();

    const form = useForm<z.infer<typeof CreateTicketSchema>>({
        resolver: zodResolver(CreateTicketSchema),
        defaultValues: {
            description: "",
            subject: ""
        }
    })

    const onSubmit = (values: z.infer<typeof CreateTicketSchema>) => {
        setError("")
        setSuccess("")
        createTicket(values)
            .then((data) => {

                form.reset()
                if (data.error) {
                    setError("");
                }
                if (data.success) {
                    setSuccess("");
                    router.push("/account/view-tickets");
                }
            })

    }

    return (

        <div className="">
            <Container>
                <div className="p-4 flex flex-col">

                    <h1 className="text-xl font-medium mb-4 text-center">Create Ticket</h1>

                    <form className=" flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>

                        <div className="flex flex-col gap-1">
                            <label>Subject:</label>
                            <input className="rounded dark:bg-slate-700 p-1" {...form.register("subject")} />
                            <p> {form.formState.errors.subject?.message} </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label>Description:</label>
                            <textarea
                                rows={6}
                                className="rounded dark:bg-slate-700 p-1" {...form.register("description")} />
                            <p> {form.formState.errors.description?.message} </p>
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