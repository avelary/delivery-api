import { email, z } from "zod"

export const SessionSchema = z.object({
    email: z.email(),
    password: z.string().trim().min(6, "password must have at least six characters.")
})