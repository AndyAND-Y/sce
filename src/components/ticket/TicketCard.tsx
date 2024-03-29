import { Ticket, User } from "@prisma/client"
import Link from "next/link"
import { MdClose } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

interface TicketCardProps {
    ticket: (Ticket & { user?: User })
}

export default async function TicketCard({ ticket }: TicketCardProps) {

    const timeAgo = new TimeAgo('en-US')

    const resolvedInfo = (
        <div className="p-2 bg-green-500/80 backdrop-blur rounded-lg shadow-sm shadow-red-300 dark:shadow-green-600  hover:bg-green-500 hover:backdrop-blur-0 duration-200">
            <div className="size-6">
                <MdCheck className="w-full h-full" />
            </div>
        </div>
    )

    const unresolvedInfo = (
        <div className="p-2 bg-red-500/80 backdrop-blur rounded-lg shadow-sm shadow-red-300 dark:shadow-red-600  hover:bg-red-500 hover:backdrop-blur-0 duration-200">
            <div className="size-6">
                <MdClose className="w-full h-full" />
            </div>
        </div>
    )

    return (
        <Link
            href={"/account/view-tickets/" + ticket.id}
        >
            <div className="flex justify-between items-center p-4 rounded-lg shadow-sm hover:shadow bg-slate-200 dark:bg-slate-900 hover:bg-slate-300 hover:dark:bg-slate-700 transition-all duration-200">

                <div className="flex gap-4 w-full">
                    <div className="font-medium text-gray-700 dark:text-gray-400 w-6">{timeAgo.format(ticket.createDate.getTime(), 'mini')}</div>
                    <div className="grid grid-cols-6 w-full">
                        <div className="col-span-1 text-nowrap">
                            {ticket.user?.name}
                        </div>
                        <div className="col-span-2 text-nowrap">
                            {ticket.subject}
                        </div>
                        <div className="col-span-2 text-nowrap truncate">
                            {ticket.description}
                        </div>
                    </div>
                </div>

                <div className="pr-3">
                    {ticket.resolved ? resolvedInfo : unresolvedInfo}
                </div>
            </div>
        </Link>
    )

}