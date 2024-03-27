import AccountPage from "@/components/account/AccountPage";
import getCurrentUser from "@/data/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Account() {

    const currentUser = await getCurrentUser();
    if (!currentUser) {
        redirect('/login');
    }

    return (<AccountPage />)

}