"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../Button";
import ValidateSchema from "@/schemas/validateSchema";
import Container from "../Container";
import validate from "@/actions/validate";
import { User } from "@prisma/client";
import ChangeDetailsSchema from "@/schemas/changeDetailsSchema";
import changeDetails from "@/actions/changeDetails";

interface ChangeDetailsFormProps {
    user: User
}

export default function ChangeDetailsForm({ user }: ChangeDetailsFormProps) {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const router = useRouter();

    const form = useForm<z.infer<typeof ChangeDetailsSchema>>({
        resolver: zodResolver(ChangeDetailsSchema),
        defaultValues: {
            has2FA: user.has2FA,
            email: user.email ?? "",
            newPassword: undefined,
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof ChangeDetailsSchema>) => {
        setError("");
        setSuccess("");
        changeDetails(values)
            .then((data) => {

                if (data?.error) {
                    form.reset()
                    setError(data.error);
                }

                if (data?.success) {
                    form.reset()
                    setSuccess(data.success);
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

                    <h1 className="text-xl font-medium mb-4 text-center">Change Details</h1>

                    <form className=" flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>

                        <div className="flex flex-col gap-1">
                            <label>Password</label>
                            <input className="rounded dark:bg-slate-700 p-1" {...form.register("password")} />
                            <p> {form.formState.errors.password?.message} </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>New Password</label>
                            <input className="rounded dark:bg-slate-700 p-1" {...form.register("newPassword")} />
                            <p> {form.formState.errors.newPassword?.message} </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>Email</label>
                            <input className="rounded dark:bg-slate-700 p-1" {...form.register("email")} />
                            <p> {form.formState.errors.email?.message} </p>
                        </div>
                        <div className="flex  gap-1">
                            <label>2FA: </label>
                            <input className="rounded dark:bg-slate-700 p-1" type="checkbox" defaultChecked={user.has2FA} {...form.register("has2FA")} />
                            <p> {form.formState.errors.has2FA?.message} </p>
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