"use server";

import getCurrentUser from "@/data/getCurrentUser";
import CreateTicketSchema from "@/schemas/createTicketSchema";
import * as z from "zod";
import db from "@/lib/db";


export default async function createTicket(values: z.infer<typeof CreateTicketSchema>) {

    const validatedFields = CreateTicketSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { description, subject } = validatedFields.data;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return { error: "Invalid user!" }
    }

    const ticket = await db.ticket.create({
        data: {
            createDate: new Date().toISOString(),
            userId: currentUser?.id,
            description,
            subject,
        }
    })

    return { success: "Ticket Created!" }
}