import PortfolioView from "@/components/portfolio/PortfolioView";
import getCurrentUser from "@/data/getCurrentUser"
import db from "@/lib/db";
import { redirect } from "next/navigation";


export default async function Portfolio() {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/')
    }

    if (currentUser.role !== "TRADER") {
        redirect('/account/validate')
    }

    const portfolio = await db.portfolio.findUnique({
        where: {
            userId: currentUser.id
        }
    })

    if (!portfolio) {
        redirect('/account/validate')
    }

    return (<></>)

}