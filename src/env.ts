import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
   PORT: z.coerce.number().default(3333)
})

export const env = envSchema.parse(process.env)