import { getServerSession } from "next-auth";

import db from "@/lib/db";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { Prisma } from "@prisma/client";

export async function getSession() {
    return await getServerSession(authOptions);
}


export default async function getCurrentUser(include?: Prisma.UserInclude) {
    try {

        const session = await getSession();

        if (!session?.user?.email) {
            return null
        }

        const currentUser = await db.user.findUnique({
            where: {
                email: session.user.email as string
            },
            include: {
                ...include
            }
        })

        if (!currentUser) {
            return null
        }

        return currentUser;

    } catch (error: any) {
        return null;
    }
}