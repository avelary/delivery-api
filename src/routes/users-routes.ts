import { Router } from "express";
import { UsersController } from "@/controllers/user-controller";

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.get("/", usersController.index)

export { usersRoutes }