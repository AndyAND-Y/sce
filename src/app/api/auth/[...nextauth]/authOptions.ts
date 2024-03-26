import { db } from "@/lib/db";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials.password) {
                    throw new Error('No credentials!')
                }

                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user || !user?.hashedPassword) {
                    throw new Error("User does not exist!")
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials!")
                }

                if (!user.has2FA) {
                    return user;
                }

                ///TO DO add 2fa

                return null

            }
        })
    ],
    pages: {
        signIn: '/',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt",
    },
    secret: "SECRET"
}

export default authOptions;