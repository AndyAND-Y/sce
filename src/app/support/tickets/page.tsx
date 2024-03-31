import TicketsView from "@/components/ticket/TicketsView";
import db from "@/lib/db"

export default async function Tickets() {

    const tickets = await db.ticket.findMany({ include: { user: true } });


    return (<TicketsView tickets={tickets} supportView />)

}