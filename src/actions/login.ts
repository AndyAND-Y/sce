"use server";

import LoginSchema from "@/schemas/loginSchema";
import * as z from "zod";
import db from "@/lib/db";
import { generateTwoFactorToken } from "@/lib/token";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/getTwoFactorToken";
import { getTwoFactorConfirmationByUserId } from "@/data/getTwoFactorConfirmation";

const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, code } = validatedFields.data;

    const existingUser = await db.user.findUnique({
        where: {
            email: email
        }
    })

    if (!existingUser || !existingUser.email || !existingUser.hashedPassword) {
        return { error: "Email does not exist!" }
    }

    if (existingUser.has2FA) {
        /// TO DO 2FA

        if (code) {

            const twoFactorToken = await getTwoFactorTokenByEmail(
                existingUser.email,
            );

            if (!twoFactorToken) {
                return { error: "Invalid code!" }
            }

            if (twoFactorToken.token !== code) {
                return { error: "Invalid code!" }
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if (hasExpired) {
                return { error: "Code expired!" };
            }

            await db.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id
                }
            })

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id
                    }
                })
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            })

        }
        else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);

            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token,
            )

            return { twoFactor: true }
        }
    }

    return { success: "Logged in!" }

}

export default login;