import Link from "next/link";
import Button from "../Button";
import { Section } from "./AccountPage";

interface SectionCardProps {
    section: Section
}

export default function SectionCard({ section }: SectionCardProps) {
    return (
        <div className="h-48 w-96 p-4 rounded-lg bg-slate-300/70 dark:bg-slate-900/70 flex flex-col gap-2 justify-between">
            <div className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-center">{section.title}</div>
                <div className="text-xl text-center">{section.description}</div>
            </div>
            <div className="flex justify-center gap-2">
                <Link
                    href={section.link}
                >
                    <Button>
                        {section.actionLabel}
                    </Button>
                </Link>

                {section.secondActionLabel && section.secondLink && (
                    <Link
                        href={section.secondLink}
                    >
                        <Button>
                            {section.secondActionLabel}
                        </Button>
                    </Link>
                )}


            </div>

        </div>
    )
}