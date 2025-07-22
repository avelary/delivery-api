import { Router } from "express";
import { DeliveryLogsController } from "@/controllers/deliveries-logs-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUSerAuthorization } from "@/middlewares/verify-user-authorization";

const deliveryLogsRoutes = Router()
const deliveryLogsController = new DeliveryLogsController

deliveryLogsRoutes.post("/", ensureAuthenticated, verifyUSerAuthorization(["sale"]), deliveryLogsController.create)
deliveryLogsRoutes.get("/:delivery_id/show", ensureAuthenticated, verifyUSerAuthorization(["sale", "customer"]), deliveryLogsController.show)

export { deliveryLogsRoutes }