import LoginPage from "@/components/login/LoginPage";
import getCurrentUser from "@/data/getCurrentUser";
import { redirect } from "next/navigation";


export default async function Login() {

    const currentUser = await getCurrentUser();
    if (currentUser) {
        redirect('/');
    }

    return (<LoginPage />)
}