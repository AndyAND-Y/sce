import React from "react"

interface ContainerProps {
    children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {

    return (
        <div className=" bg-slate-300 dark:bg-slate-900 rounded-lg p-1 shadow-md shadow-slate-400 dark:shadow-slate-700 border-x-2 border-black dark:border-white">
            {children}
        </div>
    )

}