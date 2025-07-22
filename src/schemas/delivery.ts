import { z } from "zod"

export const DeliverySchema = z.object({
    user_id: z.uuid(),
    description: z.string()
})  