import { Request, Response } from "express"
import { AppError } from "@/utils/app-error"
import { prisma } from "@/database/prisma"
import { DeliverySchema } from "@/schemas/delivery"

class DeliveryController {
    async create(request: Request, response: Response){
        const { user_id, description } = DeliverySchema.parse(request.body)
        await prisma.delivery.create({
            data: { userId: user_id, description }
        })

        return response.status(201).json()
    }

    async index(request: Request, response: Response){
        const deliveries = await prisma.delivery.findMany({
            include: {
                user: {select: { name: true, email: true }}
            }
        })

        return response.status(201).json(deliveries)
    }
}

export { DeliveryController }