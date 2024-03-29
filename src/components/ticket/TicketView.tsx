import { Ticket, User } from "@prisma/client"

import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import { MdCheck, MdClose } from "react-icons/md"

TimeAgo.addDefaultLocale(en)

interface TicketViewProps {
    supportView?: boolean
    ticket: (Ticket & { user: User })
}


export default function TicketView({ supportView, ticket }: TicketViewProps) {

    const timeAgo = new TimeAgo('en-US')

    const resolvedInfo = (
        <div className="p-2 bg-green-500/80 backdrop-blur rounded-lg shadow-sm shadow-green-300 dark:shadow-green-600  hover:bg-green-500 hover:backdrop-blur-0 duration-200">
            <div className="flex gap-2">
                <div>Resolved</div>
                <div className="size-6">
                    <MdCheck className="w-full h-full" />
                </div>
            </div>
        </div>
    )

    const unresolvedInfo = (
        <div className="p-2 bg-red-500/80 backdrop-blur rounded-lg shadow-sm shadow-red-300 dark:shadow-red-600  hover:bg-red-500 hover:backdrop-blur-0 duration-200">
            <div className="flex gap-2">
                <div>Unresolved</div>
                <div className="size-6">
                    <MdCheck className="w-full h-full" />
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <div className="flex flex-col p-4 rounded-lg shadow-sm bg-slate-200 dark:bg-slate-900 transition-all duration-200">

                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <div className="text-3xl font-bold">{ticket.subject}</div>
                        <div className="font-medium">{timeAgo.format(ticket.createDate)}</div>
                    </div>
                    <div className="">
                        {ticket.resolved ? resolvedInfo : unresolvedInfo}
                    </div>
                </div>

                <div className="pt-8 p-2">{ticket.description}</div>
            </div>

            {
                ticket.resolved === false && supportView &&
                (
                    <div className="flex justify-center p-2 pt-8">
                        <div className="p-2 bg-green-500/80 backdrop-blur rounded-lg shadow-sm shadow-green-300 dark:shadow-green-600  hover:bg-green-500 hover:backdrop-blur-0 duration-200">
                            <div className="flex gap-2">
                                <div>Resolve</div>
                                <div className="size-6">
                                    <MdCheck className="w-full h-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }


        </div>
    )

}