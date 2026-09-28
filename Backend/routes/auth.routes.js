import { Router } from "express"
import { signUp } from "../controllers/auth.controller.js"
import { signIn } from "../controllers/auth.controller.js"
import { signOut } from "../controllers/auth.controller.js"
import { verifyEmail } from "../controllers/auth.controller.js"
import { resendVerificationCode } from "../controllers/auth.controller.js"


const authRouter = Router()

authRouter.post("/signup", signUp)
authRouter.post("/signin", signIn)
authRouter.post("/signout", signOut)
authRouter.post("/verify-email", verifyEmail)
authRouter.post("/resend-code", resendVerificationCode)

export default authRouter