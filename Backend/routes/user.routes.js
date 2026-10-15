import { Router } from "express"
import authorize from "../middleware/auth.middleware.js"
import { getUsers, getUser, updateMe } from "../controllers/user.controller.js"

const userRouter = Router()

userRouter.get("/", getUsers)
userRouter.put("/me", authorize, updateMe)
userRouter.get("/:id", authorize, getUser)

export default userRouter