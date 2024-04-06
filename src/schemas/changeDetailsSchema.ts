import * as z from "zod";


const ChangeDetailsSchema = z.object({
    password: z.string().min(1, {
        message: "Required!"
    }),
    newPassword: z
        .union([z.string().length(0), z.string().min(6, { message: "Too short!" })])
        .optional()
        .transform(e => e === "" ? undefined : e),

    has2FA: z.boolean().optional(),
    email: z.string().email({
        message: "Email is required!"
    }).optional(),

})

export default ChangeDetailsSchema;