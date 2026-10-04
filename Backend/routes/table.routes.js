import { Router } from "express"
import authorize from "../middleware/auth.middleware.js"
import { getTablesByRestaurant , createTable, updateTableStatus } from "../controllers/table.controller.js"

const tableRouter = Router()

tableRouter.get("/restaurant/:restaurantId", getTablesByRestaurant)
tableRouter.post("/", authorize, createTable)
tableRouter.put("/:id/status", authorize, updateTableStatus)

export default tableRouter