import { Router } from "express"
import authorize from "../middleware/auth.middleware.js"
import { createRestaurant, getRestaurants, getRestaurantById } from "../controllers/restaurant.controller.js"

const restaurantRouter = Router()

restaurantRouter.post("/", authorize, createRestaurant)
restaurantRouter.get("/", getRestaurants)
restaurantRouter.get("/:id", getRestaurantById)

export default restaurantRouter