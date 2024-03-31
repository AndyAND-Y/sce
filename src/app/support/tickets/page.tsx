import TicketsView from "@/components/ticket/TicketsView";
import getCurrentUser from "@/data/getCurrentUser";
import db from "@/lib/db"
import { redirect } from "next/navigation";

export default async function Tickets() {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/support/login')
    }

    if (currentUser.role !== "SUPPORT") {
        redirect("/support/login")
    }

    const tickets = await db.ticket.findMany({ include: { user: true } });
    return (<TicketsView tickets={tickets} supportView />)

}