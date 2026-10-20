import { Router } from "express"
import authorize from "../middleware/auth.middleware.js"
import { getUser, updateMe } from "../controllers/user.controller.js"

const userRouter = Router()

userRouter.put("/me", authorize, updateMe)
userRouter.get("/:id", authorize, getUser)

export default userRouter