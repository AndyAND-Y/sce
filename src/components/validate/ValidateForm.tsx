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

export default function ValidateForm() {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const router = useRouter();

    const form = useForm<z.infer<typeof ValidateSchema>>({
        resolver: zodResolver(ValidateSchema),
        defaultValues: {
            legalName: "",
        }
    })

    const onSubmit = (values: z.infer<typeof ValidateSchema>) => {
        setError("");
        setSuccess("");
        validate(values)
            .then((data) => {

                if (data?.error) {
                    form.reset()
                    setError(data.error);
                }

                if (data?.success) {
                    form.reset()
                    setSuccess(data.success);
                    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
                    sleep(1000).then(() => {
                        router.push('/')
                    })
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

                    <h1 className="text-xl font-medium mb-4 text-center">Become a trader!</h1>

                    <form className=" flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>

                        <div className="flex flex-col gap-1">
                            <label>Full legal name:</label>
                            <input className="rounded dark:bg-slate-700 p-1" {...form.register("legalName")} />
                            <p> {form.formState.errors.legalName?.message} </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label>Image of yourself:</label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="p-4 flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, WEBM (MAX 5MB)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onChange={(ev) => {
                                        form.setValue("photoName", ev.target.value)
                                    }} />
                                </label>
                            </div>
                            <p> {form.formState.errors.photoName?.message} </p>
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