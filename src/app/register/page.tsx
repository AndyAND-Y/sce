import RegisterPage from "@/components/register/RegisterPage";
import getCurrentUser from "@/data/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Register() {

    const currentUser = await getCurrentUser();
    if (currentUser) {
        redirect('/');
    }

    return <RegisterPage />
}