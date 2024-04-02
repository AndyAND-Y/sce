
import * as z from "zod";

const OrderSchema = z.object({
    quantity: z.number().positive({
        message: "Not a positive number"
    }),
    side: z.enum(["BUY", "SELL"])
})

export default OrderSchema;