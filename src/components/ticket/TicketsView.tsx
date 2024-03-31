import { Ticket, User } from "@prisma/client";
import TicketCard from "./TicketCard";

interface TicketsViewProps {
    tickets: (Ticket & { user?: User })[]
    supportView: boolean
}

export default function TicketsView({ tickets, supportView }: TicketsViewProps) {

    return (
        <div className="flex flex-col gap-2">

            <div className="flex w-full justify-between items-center p-4 rounded-lg shadow-sm bg-slate-200 dark:bg-slate-900 transition-all duration-200">
                <div className="flex gap-4 w-full">
                    <div className="font-medium text-gray-700 dark:text-gray-400 w-6">T</div>
                    <div className="grid grid-cols-6 w-full">
                        <div className="col-span-1 text-nowrap font-semibold">
                            Name
                        </div>
                        <div className="col-span-2 text-nowrap font-semibold">
                            Subject
                        </div>
                        <div className="col-span-2 text-nowrap truncate font-semibold">
                            Description
                        </div>
                    </div>
                </div>
                <div className="font-semibold">
                    Solved?
                </div>

            </div>

            <div className="flex flex-col w-full gap-2">
                {tickets.map((ticket) => {
                    return <TicketCard key={ticket.id} ticket={ticket} supportView={supportView} />
                })}
            </div>
        </div>
    )

}   