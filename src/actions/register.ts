"use server";

import * as z from "zod";
import RegisterSchema from "@/schemas/registerSchema";
import bcrypt from "bcrypt";
import db from "@/lib/db";

const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password, name } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.findUnique({
        where: {
            email: email
        }
    })


    if (existingUser) {
        return { error: "Email already in use!" }
    }

    await db.user.create({
        data: {
            name,
            email,
            hashedPassword,
        }
    })

    return { success: "Account registered!" }

}

export default register;