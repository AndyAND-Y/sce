import db from "@/lib/db";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getTwoFactorConfirmationByUserId } from "@/data/getTwoFactorConfirmation";


const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                code: { label: "Code", type: "text" }
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

                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(user.id);

                if (!twoFactorConfirmation) {
                    throw new Error("No confirmation!");
                }

                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id
                    }
                })

                return user;

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