"use server";
import getCurrentUser from "@/data/getCurrentUser";
import getPriceSymbol from "@/data/getPriceSymbol";
import db from "@/lib/db";
import OrderSchema from "@/schemas/orderSchema";
import * as z from "zod";


const order = async (values: z.infer<typeof OrderSchema>, symbol: string) => {
    const validatedFields = OrderSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { quantity, side } = validatedFields.data;
    const currentUser = await getCurrentUser({ portfolio: true });

    if (!currentUser) {
        return { error: "You have to be logged in!" }
    }

    if (currentUser.role !== "TRADER" || currentUser.portfolio == null) {
        return { error: "You have to be a trader!" }
    }

    const currentPrice = await getPriceSymbol(symbol);

    if (side === "BUY") {

        const amountToPay = currentPrice * quantity;

        if (currentUser.portfolio.fiat < amountToPay) {
            return { error: "Not enough money!" }
        }

        const hasCoinInPortfolio =
            currentUser.portfolio.coins
                .map((coin) => coin.symbol)
                .includes(symbol)

        if (!hasCoinInPortfolio) {
            currentUser.portfolio.coins
                .push({ amount: 0, symbol })
        }

        const index = currentUser.portfolio.coins.findIndex((coin) => coin.symbol === symbol);

        currentUser.portfolio.coins[index].amount += quantity;

        await db.portfolio.update({
            where: {
                id: currentUser.portfolio.id
            },
            data: {
                fiat: currentUser.portfolio.fiat - amountToPay,
                coins: currentUser.portfolio.coins
            }
        })

        await db.transaction.create({
            data: {
                amount: quantity,
                type: "ORDER",
                userId: currentUser.id,
                side: side,
                symbol: symbol,
                price: quantity * currentPrice
            }
        })

        return {
            success: "Order filled at " + currentPrice + "!"
        }

    }

    if (side == "SELL") {

        const amountToAdd = quantity * currentPrice;

        const hasCoinInPortfolio =
            currentUser.portfolio.coins
                .map((coin) => coin.symbol)
                .includes(symbol)

        if (!hasCoinInPortfolio) {
            return {
                error: "You don't have " + symbol
            }
        }

        const index = currentUser.portfolio.coins.findIndex((coin) => coin.symbol === symbol);

        const coin = currentUser.portfolio.coins[index];

        if (coin.amount < quantity) {
            return {
                error: "You don't have enough " + symbol
            }
        }

        coin.amount -= quantity;

        currentUser.portfolio.coins = currentUser.portfolio.coins.filter((coin) => coin.amount > 0)

        await db.portfolio.update({
            where: {
                userId: currentUser.id
            },
            data: {
                fiat: currentUser.portfolio.fiat + amountToAdd,
                coins: currentUser.portfolio.coins
            }
        })

        await db.transaction.create({
            data: {
                amount: quantity,
                type: "ORDER",
                userId: currentUser.id,
                side: side,
                symbol: symbol,
                price: quantity * currentPrice
            }
        })

        return {
            success: "Order filled at " + currentPrice + "!"
        }
    }

    return {
        error: "Something went wrong!"
    }

}

export default order;