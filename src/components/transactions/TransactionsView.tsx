import { Transaction } from "@prisma/client";
import TransactionCard from "./TransactionCard";


export default function TransactionsView({ transactions }: { transactions: Transaction[] | null }) {



    return (
        <div className="flex justify-center w-full">
            <div className="w-2/3 flex flex-col gap-4">
                <div className="p-4 dark:bg-slate-900 bg-slate-200 rounded-lg">
                    <div className="flex flex-col gap-4">
                        <div className="text-4xl text-center font-semibold p-2 underline">Transactions</div>
                        <div className="grid grid-cols-5">
                            <div>T</div>
                            <div>Type</div>
                            <div>Price</div>
                            <div>Symbol</div>
                            <div>Quantity</div>
                        </div>
                    </div>
                </div>

                {transactions && (
                    <div className="flex flex-col gap-4">
                        {transactions.map((transaction) => <TransactionCard transaction={transaction} key={transaction.id} />)}
                    </div>
                )}

            </div>
        </div>
    )

}