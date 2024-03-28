"use client";

import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";



import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { login } from "../../../actions/login";
import { useState, useTransition } from "react";

export const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
});

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        });
    };

    return (
        <CardWrapper headerLabel="Welcome back" backButtonLabel="Don't have an account?" backButtonHref="/auth/register">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className = "space-y-6">
                    <div className="space-y-4">
                        <FormField control={form.control} name="email" render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} id="email" type="email" placeholder="someone@example.com" className="bg-zinc-100"/>
                                </FormControl>
                                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="password" render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} id="password" type="password" className="bg-zinc-100"/>
                                </FormControl>
                                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                            </FormItem>
                        )}/>
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" disabled={isPending} variant="outline" className="w-full bg-zinc-300 font-semibold">
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}