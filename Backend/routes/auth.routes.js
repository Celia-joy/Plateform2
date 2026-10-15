import { Router } from "express"
import authorize from "../middleware/auth.middleware.js"
import {
    signUp,
    signIn,
    signOut,
    verifyEmail,
    resendVerificationCode,
    forgotPassword,
    resetPassword,
    changePassword,
} from "../controllers/auth.controller.js"

const authRouter = Router()

authRouter.post("/signup", signUp)
authRouter.post("/signin", signIn)
authRouter.post("/signout", signOut)
authRouter.post("/verify-email", verifyEmail)
authRouter.post("/resend-code", resendVerificationCode)
authRouter.post("/forgot-password", forgotPassword)
authRouter.post("/reset-password", resetPassword)
authRouter.post("/change-password", authorize, changePassword)

export default authRouter