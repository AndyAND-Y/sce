import TicketView from "@/components/ticket/TicketView";
import getCurrentUser from "@/data/getCurrentUser";
import db from "@/lib/db";
import { redirect } from "next/navigation";

interface TicketProps {
    params: {
        ticketId: string
    }
}

export default async function Ticket({ params }: TicketProps) {

    const ticketId = params.ticketId;

    const ticket = await db.ticket.findUnique({
        where: {
            id: ticketId
        },
        include: {
            user: true
        }
    })

    if (!ticket) {
        redirect('/');
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/');
    }

    return (
        <div className="flex w-full justify-center">
            <div className="w-1/3">
                <TicketView
                    supportView={currentUser.role === "SUPPORT"}
                    ticket={ticket} />
            </div>
        </div>
    )

}