import TicketsView from "@/components/ticket/TicketsView";
import getCurrentUser from "@/data/getCurrentUser";
import getUserTickets from "@/data/getUserTickets";
import { redirect } from "next/navigation";


export default async function ViewTickets() {

    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    const tickets = await getUserTickets(user.id);


    return (
        <div className="flex justify-center">
            <div className="w-1/2">
                <TicketsView tickets={tickets} supportView={false} />
            </div>
        </div>
    )


}