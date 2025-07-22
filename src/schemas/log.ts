import { z } from "zod"

export const LogSchema = z.object({
    delivery_id: z.uuid(),
    description: z.string()
})

export const LogShowSchema = z.object({
    delivery_id: z.uuid(),
})