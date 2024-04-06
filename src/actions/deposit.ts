
"use server";
import getCurrentUser from "@/data/getCurrentUser";
import db from "@/lib/db";
import DepositSchema from "@/schemas/depositSchema";
import * as z from "zod";

export default async function deposit(values: z.infer<typeof DepositSchema>) {

    const validatedFields = DepositSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { amount, expirationDate, } = validatedFields.data;

    const currentUser = await getCurrentUser({ portfolio: true });

    if (!currentUser) {
        return { error: "Not logged in!" }
    }

    if (!currentUser.portfolio) {
        return { error: "Not a trader!" }
    }

    const year = 2000 + Number(expirationDate.split('/')[1]);
    const month = -1 + Number(expirationDate.split('/')[0]);

    if (year < new Date().getFullYear()) {
        return { error: "Card has expired!" }
    }

    if (year == new Date().getFullYear() && month > new Date().getMonth()) {
        return { error: "Card has expired!" }
    }

    currentUser.portfolio.fiat += amount;

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
            type: "DEPOSIT",
            price: amount,
            userId: currentUser.id,
        }
    })

    return { success: "Deposit made" }
}