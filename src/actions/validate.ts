"use server";
import getCurrentUser from "@/data/getCurrentUser";
import db from "@/lib/db";
import ValidateSchema from "@/schemas/validateSchema";
import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

export default async function validate(values: z.infer<typeof ValidateSchema>) {

    const validatedFields = ValidateSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { photoName, legalName } = validatedFields.data;


    const isCorrectType = ACCEPTED_IMAGE_TYPES
        .map((end) => photoName.endsWith(end))
        .reduce((acc, curr) => acc = (acc || curr), false)

    if (!isCorrectType) {
        return { error: "Accepted types: " + ACCEPTED_IMAGE_TYPES.join(" ") }
    }


    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return { error: "Not logged in!" }
    }

    await db.user.update({
        where: {
            id: currentUser?.id
        },
        data: {
            name: legalName,
            isValidated: true,
            role: "TRADER"
        }
    })

    return { success: "You are now a trader!" }

}