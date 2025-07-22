import { Router } from "express";
import { DeliveryController } from "@/controllers/deliveries-controller";
import { DeliveriesStatusController } from "@/controllers/deliveries-status-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUSerAuthorization } from "@/middlewares/verify-user-authorization";


const deliveryRoutes = Router()
const deliveryControler = new DeliveryController()
const deliveryStatusController = new DeliveriesStatusController

deliveryRoutes.use(ensureAuthenticated, verifyUSerAuthorization(["sale"]))
deliveryRoutes.post("/", deliveryControler.create)
deliveryRoutes.get("/", deliveryControler.index)

deliveryRoutes.patch("/:id/status", deliveryStatusController.update)

export { deliveryRoutes }