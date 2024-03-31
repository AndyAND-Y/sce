import SectionCard from "../account/SectionCard"

export type Section = {
    title: string,
    description: string,
    actionLabel: string,
    link: string,
    secondActionLabel?: string,
    secondLink?: string
}

const sections: Section[] = [
    {
        title: "View Tickets",
        description: "View all the tickets. Start to solve them!",
        actionLabel: "View",
        link: "/support/tickets",
    },
    {
        title: "Log out",
        description: "Log out of your account.",
        actionLabel: "Log out",
        link: "/log-out"
    }

]

export default function SupportMainPage() {

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 w-4/5 gap-4 gap-y-20">
                {sections.map((section, index) => (
                    <div key={"section_" + index}
                        className="flex w-full justify-center"
                    >
                        <SectionCard section={section} />
                    </div>))
                }
            </div>
        </div>
    )

}