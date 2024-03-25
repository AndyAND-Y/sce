const AuthLayout = ({ children }: {children: React.ReactNode}) => {
    return (
        <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-600 to bg-gray-800">
            {children}
        </div>
    );
}

export default AuthLayout;