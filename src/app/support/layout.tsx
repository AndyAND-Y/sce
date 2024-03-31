import getCurrentUser from "@/data/getCurrentUser";
import { redirect } from "next/navigation";

export default async function SupportLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const currentUser = await getCurrentUser();

    if (currentUser && currentUser.role !== "SUPPORT") {
        redirect('/');
    }

    return (<>{children}</>);
}
