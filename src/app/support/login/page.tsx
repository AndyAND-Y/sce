import LoginPage from "@/components/login/LoginPage";
import getCurrentUser from "@/data/getCurrentUser";
import { redirect } from "next/navigation";


export default async function SupportLogin() {

    const currentUser = await getCurrentUser();
    if (currentUser) {
        redirect('/');
    }

    return (<LoginPage title={"Support Login"} redirectLink={"/support/"} support />)
}