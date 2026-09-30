import { Router } from "express"
import authorize from "../middleware/auth.middleware.js"
import { createOrder, getOrdersByRestaurant, getMyOrders, updateOrderStatus} from "../controllers/order.controller.js"

const orderRouter = Router()

orderRouter.post("/", authorize, createOrder)
orderRouter.get("/restaurant/:restaurantId", authorize, getOrdersByRestaurant)
orderRouter.get("/my-orders", authorize, getMyOrders)
orderRouter.put("/:id/status", authorize, updateOrderStatus)

export default orderRouter