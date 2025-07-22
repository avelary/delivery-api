import { Request, Response } from "express";
import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";
import { compare} from "bcrypt";
import { sign } from "jsonwebtoken"
import { authConfig } from "@/config/auth";

import { SessionSchema } from "@/schemas/session";


class SessionController {
    async create(request:  Request, response: Response){
        const { email, password } = SessionSchema.parse(request.body)
        const user = await prisma.user.findFirst({ where: {email} })

        if(!user){
            throw new AppError("Invalid email or password", 401)
        }

        const passwordMatched = await compare(password, user.password)
        if(!passwordMatched){
            throw new AppError("Invalid email or password", 401)
        }

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({ role: user.role ?? "customer" }, secret, {subject: user.id, expiresIn})

        const {password: hashedPassword, ...userWithodPassword} = user

        return response.status(201).json({ token, user: userWithodPassword })
    }

    index(request:  Request, response: Response){

    return response.status(201).json("ok")
    }

}

export { SessionController }