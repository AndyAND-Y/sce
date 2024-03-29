import getCurrentUser from "@/data/getCurrentUser";
import { redirect } from "next/navigation";

export default async function AccountLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/login");
    }
    return (<>{children}</>)

}
