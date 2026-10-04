import { Router } from "express"
import authorize from "../middleware/auth.middleware.js"
import { createStaff, getStaffByRestaurant, updateStaff, deleteStaff } from "../controllers/staff.controller.js"

const staffRouter = Router()

staffRouter.post("/", authorize, createStaff)
staffRouter.get("/restaurant/:restaurantId", authorize, getStaffByRestaurant)
staffRouter.put("/id", authorize, updateStaff)
staffRouter.delete("/:id", authorize, deleteStaff)

export default staffRouter