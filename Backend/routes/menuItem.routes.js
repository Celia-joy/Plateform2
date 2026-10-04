import { Router } from "express"
import authorize from "../middleware/auth.middleware.js"
import { createMenuItem, getMenItemsByRestaurant, updateMenuItem, deleteMenuItem} from "../controllers/menuItem.controller.js"

const menuItemRouter = Router()

menuItemRouter.get("/restaurant/:restaurantId", getMenuItemsByRestaurant)
menuItemRouter.post("/", authorize, createMenuItem)
menuItemRouter.put("/:id", authorize, updateMenuItem)
menuItemRouter.delete("/:id", authorize, deleteMenuItem)

export default menuItemRouter