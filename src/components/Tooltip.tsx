
interface TooltipProps {
    children: React.ReactNode,
    tooltip: React.ReactNode
}

export default function Tooltip({ children, tooltip }: TooltipProps) {

    return (
        <div className="has-tooltip relative">
            <div className="tooltip mt-8">
                {tooltip}
            </div>
            {children}
        </div>
    )
}