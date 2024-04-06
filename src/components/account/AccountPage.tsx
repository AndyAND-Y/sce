import SectionCard from "./SectionCard"

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
        title: "Portfolio",
        description: "Manage your assets.",
        actionLabel: "Manage",
        link: "/account/portfolio",
    },
    {
        title: "Transactions",
        description: "View your transactions.",
        actionLabel: "View",
        link: "/account/transactions"
    },
    {
        title: "Validate",
        description: "Validate your account to trade.",
        actionLabel: "Validate",
        link: "/account/validate"
    },
    {
        title: "Change Details",
        description: "Change details of your account.",
        actionLabel: "Change",
        link: "/account/change-details"
    },
    {
        title: "Create Ticket",
        description: "If you encounter any problems with your account, create a ticket",
        actionLabel: "Create",
        link: "/account/create-ticket",
        secondActionLabel: "View Tickets",
        secondLink: "/account/view-tickets"
    },
    {
        title: "Log out",
        description: "Log out of your account.",
        actionLabel: "Log out",
        link: "/log-out"
    }

]

export default function AccountPage() {

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