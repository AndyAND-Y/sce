import * as z from "zod";

const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required!"
    }),
    password: z.string().min(6, {
        message: "Too Short!"
    }),
    name: z.string().min(1, {
        message: "Name is required!",
    }),
})

export default RegisterSchema;