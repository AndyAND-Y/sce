interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    type?: "submit" | "reset" | "button",
}

export default function Button({ children, onClick, type }: ButtonProps) {
    return (
        <button
            className="p-2 text-lg bg-slate-300 dark:bg-slate-800 rounded-lg border dark:border-white border-black hover:shadow-inner hover:dark:bg-slate-900 hover:bg-slate-400 transition-all duration-200"
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    )
}