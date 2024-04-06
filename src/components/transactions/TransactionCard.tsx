import timeAgo from "@/lib/timeAgo";
import formatNumber from "@/utils/formatNumber";
import { Transaction } from "@prisma/client";


export default function TransactionCard({ transaction }: { transaction: Transaction }) {

    return (
        <div className="p-4 rounded-lg shadow-sm hover:shadow bg-slate-200 dark:bg-slate-900">
            <div className="grid grid-cols-5">
                <div>{timeAgo.format(transaction.createdAt, "mini")}</div>
                <div>{transaction.type}{transaction.type === "ORDER" ? '-' + transaction.side : ""}</div>
                {transaction.price && <div>${formatNumber(transaction.price)}</div>}
                <div>{transaction.symbol?.toUpperCase()}</div>
                {transaction.type === "ORDER" && <div>{transaction.amount}</div>}
            </div>
        </div>
    )

}