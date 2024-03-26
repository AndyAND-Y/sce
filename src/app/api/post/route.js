import { NextResponse } from "next/server";


const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()


export const GET = async () => {
    try {

        const coins = await prisma.ownedCoins.findMany()

        return NextResponse.json(coins)
        
    } catch(err) {
        console.log(err)
        console.log("This is the error above")
        return NextResponse.json({message: "GET Error", err}, {status: 500})
    }
}