import PortfolioView from "@/components/portfolio/PortfolioView";
import getCurrentUser from "@/data/getCurrentUser"
import { redirect } from "next/navigation";


export default async function Portfolio() {

    const currentUser = await getCurrentUser({ portfolio: true });

    if (!currentUser) {
        redirect('/')
    }

    if (currentUser.role !== "TRADER") {
        redirect('/account/validate')
    }

    if (!currentUser.portfolio) {
        redirect('/account/validate')
    }

    const portfolio = currentUser.portfolio;

    return (<PortfolioView portfolio={portfolio} />)

}