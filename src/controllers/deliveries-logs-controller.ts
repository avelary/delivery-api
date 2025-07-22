import { Request, Response } from "express"
import { AppError } from "@/utils/app-error"
import { LogSchema, LogShowSchema } from "@/schemas/log"
import { prisma } from "@/database/prisma"

class DeliveryLogsController { 
    async create(request: Request, response: Response){
        const { delivery_id, description } = LogSchema.parse(request.body)
        const delivery = await prisma.delivery.findUnique({where: { id: delivery_id } })

        if(!delivery){
            throw new AppError("delivery not found.", 404)
        }
        
        if(delivery.status === "delivered"){
            throw new AppError("this order has already been delivered")
        }

        if(delivery.status === "processing") {
            throw new AppError("change status to shipped")
        }

        await prisma.log.create({
            data: { deliveryId: delivery_id, description }
        })

        return response.status(201).json()
    }

    async show(request: Request, response: Response){
        const { delivery_id } = LogShowSchema.parse(request.params)
        const delivery = await prisma.delivery.findUnique({ 
            where: {id: delivery_id}, 
            include: { 
                logs: {select: {description: true, id: true}}, 
                user: {select: {id: true, name: true, email: true }} 
            }})

        if(request.user?.role === "customer" && request.user.id !== delivery?.userId){
            throw new AppError("the user can only be view their deliveries", 401)
        }

        return response.json(delivery)
    }
}

export { DeliveryLogsController }