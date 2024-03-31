"use client";

import { useRouter } from "next/navigation";
import { MdCheck } from "react-icons/md";

interface ResolveButtonProps {
    action: () => Promise<void>
}

export default function ResolveButton({ action }: ResolveButtonProps) {


    const router = useRouter();

    const handleChange = () => {
        action();
        router.refresh();
    }

    return (<div className="p-2 bg-green-500/80 backdrop-blur rounded-lg shadow-sm shadow-green-300 dark:shadow-green-600  hover:bg-green-500 hover:backdrop-blur-0 duration-200"
        onClick={handleChange}
    >
        <div className="flex gap-2">
            <div>Resolve</div>
            <div className="size-6">
                <MdCheck className="w-full h-full" />
            </div>
        </div>
    </div>)
}