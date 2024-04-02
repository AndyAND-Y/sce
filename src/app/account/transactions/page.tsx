import TransactionsView from "@/components/transactions/TransactionsView";
import getCurrentUser from "@/data/getCurrentUser"
import { redirect } from "next/navigation";


export default async function Portfolio() {

    const currentUser = await getCurrentUser({ transactions: true });

    if (!currentUser) {
        redirect('/')
    }

    if (currentUser.role !== "TRADER") {
        redirect('/account/validate')
    }

    const transactions = currentUser.transactions;

    return (<TransactionsView transactions={transactions} />)

}