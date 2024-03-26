import * as z from "zod";

const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required!"
    }),
    password: z.string().min(6, {
        message: "Too Short!"
    }),
    code: z.optional(z.string())
})

export default LoginSchema;