import { z } from "zod"


export const paramsSchema = z.object({
    id: z.uuid(),
})

export const statusSchema = z.object({
    status: z.enum(["processing", "shipped", "delivered"])
})

