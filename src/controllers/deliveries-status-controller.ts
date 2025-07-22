import { Request, Response } from "express"
import { AppError } from "@/utils/app-error"
import { prisma } from "@/database/prisma"
import { paramsSchema, statusSchema } from "@/schemas/status"

class DeliveriesStatusController { 
    async update(request: Request, response: Response){

        const { id } = paramsSchema.parse(request.params)
        const { status } = statusSchema.parse(request.body)

        await prisma.delivery.update({ data: {status}, where: {id} })
        await prisma.log.create({ data: {deliveryId: id, description: status } })
     

        return response.json()
    }
}

export { DeliveriesStatusController }