import { Request, Response } from "express"
import { AppError } from "@/utils/app-error"

import { prisma } from "@/database/prisma"
import { hash } from "bcrypt"

import { userSchema } from "@/schemas/user"



class UsersController {
    async create(request: Request, response: Response){
        const { name, email, password } = userSchema.parse(request.body)
        const hashedPassword = await hash(password, 8)
             
        const userWithSameEmail = await prisma.user.findFirst({ where: { email } })
        if(userWithSameEmail){
            throw new AppError("email already exists.")
        }

        const user = await prisma.user.create({ data: { name, email, password: hashedPassword } })
        const { password: _, ...userWithoudPassword} = user

        return response.status(201).json(userWithoudPassword)
    }

    async index(request: Request, response: Response){
        const users = await prisma.user.findMany()
        const userWithoudPassword = users.map(({password, email, ...rest}) => rest)

        return response.json(userWithoudPassword)
    }
}

export { UsersController }