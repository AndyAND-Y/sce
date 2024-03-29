import LoginForm from "./LoginForm";

interface LoginPageProps {
    title?: string
}

export default function LoginPage({ title }: LoginPageProps) {
    return (
        <div className="flex w-full items-center justify-center h-[80vh]">
            <LoginForm title={title} />
        </div>
    )
}