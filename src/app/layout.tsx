import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import getCurrentUser from "@/data/getCurrentUser";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SCE",
    description: "Secure Crypto Exchange",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html className="dark" lang="en">
            <body className={inter.className}>
                <div className="min-h-screen">
                    <Navbar />
                    <div className="h-28"></div>
                    <div className="px-6">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
