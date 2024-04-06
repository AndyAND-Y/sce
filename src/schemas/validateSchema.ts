import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

const ValidateSchema = z.object({
    legalName: z.string().min(1, {
        message: "Required!"
    }),
    photoName: z.string().min(1, {
        message: "Required!"
    })
})

export default ValidateSchema;