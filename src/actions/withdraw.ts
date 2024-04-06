
"use server";
import getCurrentUser from "@/data/getCurrentUser";
import db from "@/lib/db";
import WithdrawSchema from "@/schemas/withdrawSchema";
import * as z from "zod";

export default async function withdraw(values: z.infer<typeof WithdrawSchema>) {

    const validatedFields = WithdrawSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { amount } = validatedFields.data;

    const currentUser = await getCurrentUser({ portfolio: true });

    if (!currentUser) {
        return { error: "Not logged in!" }
    }

    if (!currentUser.portfolio) {
        return { error: "Not a trader!" }
    }

    if (currentUser.portfolio.fiat < amount) {
        return { error: "Not enough money!" }
    }

    currentUser.portfolio.fiat -= amount;

    await db.portfolio.update({
        where: {
            userId: currentUser.id,
        },
        data: {
            fiat: currentUser.portfolio.fiat
        }
    })

    await db.transaction.create({
        data: {
            amount: amount,
            type: "WITHDRAW",
            price: amount,
            userId: currentUser.id,
        }
    })

    return { success: "Withdraw made!" }
}