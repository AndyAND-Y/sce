import SupportMainPage from "@/components/support/SupportMainPage";
import getCurrentUser from "@/data/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Page() {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/support/login')
    }

    if (currentUser.role !== "SUPPORT") {
        redirect("/support/login")
    }

    return (<SupportMainPage />)

}