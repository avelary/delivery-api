import { email, z } from "zod"

export const userSchema = z.object({
    name: z.string().trim().min(3, "name must have at least three characters."),
    email: z.email(),
    password: z.string().trim().min(6, "password must have at least six characters."),
})