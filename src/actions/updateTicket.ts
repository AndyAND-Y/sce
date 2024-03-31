"use server"

import db from "@/lib/db";

export default async function updateTicket(ticketId: string) {
    await db.ticket.update({
        where: {
            id: ticketId
        },
        data: {
            resolved: true
        }
    })
}