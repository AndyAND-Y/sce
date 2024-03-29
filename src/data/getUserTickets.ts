import db from "@/lib/db"

export default async function getUserTickets(userId: string) {

    const tickets = await db.ticket.findMany({
        where: {
            userId
        },
        include: {
            user: true
        },
        orderBy: {
            createDate: "desc"
        }
    })

    return tickets;
}