import LoginForm from "./LoginForm";

interface LoginPageProps {
    title?: string
    redirectLink?: string
    support?: boolean
}

export default function LoginPage({ title, redirectLink, support }: LoginPageProps) {
    return (
        <div className="flex w-full items-center justify-center h-[80vh]">
            <LoginForm title={title} redirectLink={redirectLink} support={support} />
        </div>
    )
}