"use server";
import getCurrentUser from "@/data/getCurrentUser";
import db from "@/lib/db";
import ChangeDetailsSchema from "@/schemas/changeDetailsSchema";
import * as z from "zod";
import bcrypt from "bcrypt";

export default async function changeDetails(values: z.infer<typeof ChangeDetailsSchema>) {

    const validatedFields = ChangeDetailsSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { password, email, has2FA, newPassword } = validatedFields.data;

    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.hashedPassword || !currentUser.email) {
        return { error: "Not logged in!" }
    }

    const isCorrectPassword = await bcrypt.compare(password, currentUser.hashedPassword);

    if (!isCorrectPassword) {
        return { error: "Invalid password!" }
    }

    const updatedEmail = email ?? currentUser.email;
    const updatedHas2FA = has2FA ?? currentUser.has2FA;

    const newPasswordHashed = await bcrypt.hash(newPassword ?? "", 10);

    const updatedPassword = newPassword ? newPasswordHashed : currentUser.hashedPassword;

    await db.user.update({
        where: {
            id: currentUser?.id
        },
        data: {
            email: updatedEmail,
            has2FA: updatedHas2FA,
            hashedPassword: updatedPassword
        }
    })

    return { success: "Change made!" }

}