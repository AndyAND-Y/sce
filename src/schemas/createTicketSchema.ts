import * as z from "zod";

const CreateTicketSchema = z.object({
    subject: z
        .string()
        .min(1, {
            message: "Too short!"
        })
        .max(30, {
            message: "Too Long!"
        }),
    description: z
        .string()
        .min(1, {
            message: "Too Short!"
        })
        .max(10000, {
            message: "Too Long!"
        })
})

export default CreateTicketSchema;