import * as z from "zod";

const DepositSchema = z.object({
    cardNumber: z.string().regex(/^\d{16}$/),
    expirationDate: z.string().regex(/^\d{2}\/\d{2}$/),
    securityCode: z.string().regex(/^\d{3}$/),
    name: z.string().min(1, { message: "Required!" }),
    amount: z.number().positive({
        message: "Not a positive number"
    }),
})

export default DepositSchema;