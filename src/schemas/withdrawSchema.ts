import * as z from "zod";

const WithdrawSchema = z.object({
    sortCode: z.string().regex(/^\d{6}$/),
    accountNumber: z.string().regex(/^\d{8}$/),
    holderName: z.string().min(1, { message: "Required!" }),
    amount: z.number().positive(),
})

export default WithdrawSchema;