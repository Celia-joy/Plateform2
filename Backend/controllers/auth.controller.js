import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js"
import { sendEmail } from "../utils/sendEmail.js"

export const signUp = async (req, res,next) => {
    const {fullName, email, password, role} = req.body
    try{
        if(!fullName || !email || !password || !role){
           const error = new Error("Full Name, email , password and role are required")
           error.statusCode= 400
           throw error
        }
        
        const existingUser = await User.findOne({ email })
        if(existingUser){
            const error = new Error("User with this email already exists")
            error.statusCode = 409
            throw error
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
        const verificationCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000)

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role,
            verificationCode,
            verificationCodeExpiresAt
        })

        try {
            await sendEmail({
                to: newUser.email,
                subject: "Verify your Plateform account",
                html: `<p>Hi ${newUser.fullName},</p>
                        <p>Your Plateform verification code is: </p>
                        <p>${verificationCode},</p>
                        <p>This code expires in 10 minutes.</p>`
            })
        }
        catch(emailError){
            console.error("Failed to send verification email: ", emailError.message)
        }
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role,
            }
        })
    }
    catch (error){
        next(error)
    }
}

export const signIn = async( req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            const error = new Error("Email and password are required")
            error.statusCode = 400
            throw error
        }
        const user = await User.findOne({ email}).select("+password");
        if(!user){
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {userId: user._id},
            JWT_SECRET,
            {expiresIn: JWT_EXPIRES_IN || "1d"}
        )
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token,
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role
                }
            }
        })

    }
    catch(error){
        next(error)
    }
}

export const signOut = async(req, res, next) =>{
    res.status(200).json({
        success: true,
        message: "User signed out successfully"
    })
}

export const verifyEmail = async(req, res, next) => {
    try{
        const { email, code } = req.body
        if(!email || !code){
            const error = new Error("Email and code are required")
            error.statusCode = 404
            throw error
        }
        const user = await User.findOne({ email }).select("+verificationCode +verificationCodeExpiresAt ")
        if(!user){
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }
        if (user.isVerified){
            return res.status(200).json({ message: "Email is already verified" })
        }
        if(!user.verificationCode || user.verificationCode !== code){
            const error = new Error("Invalid verification code")
            error.statusCode = 400
            throw error
        }
        if(user.verificationCodeExpiresAt < new Date()){
            const error = new Error("Verification code has expired. Please request a new one.")
            error.statusCode = 400
            throw error
        }

        user.isVerified = true
        user.verificationCode = undefined
        user.verificationCodeExpiresAt = undefined
        await user.save()

        res.status(200).json({message: "Email verified successfully"})

    }
    catch(error){
        next(error)
    }
}

export const resendVerificationCode = async (req, res, next) =>{
    try{
        const { email } = req.body
        if(!email){
            const error = new Error("Email is required")
            error.statusCode = 404
            throw error
        }
        const user = await User.findOne({ email })
        if (user.isVerified){
            return res.status(200).json({message: "Email is already verified"})
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
        const verificationCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000)

        user.verificationCode = verificationCode
        user.verificationCodeExpiresAt = verificationCodeExpiresAt
        await user.save()

        await sendEmail({
            to: user.email,
            subject: 'Your new Plateform verification code',
            html: `<p>Your new verification code is:</p>
                   <h2>${verificationCode}</h2>
                   <p>This code expires in 10 minutes.</p>`

        })
        res.status(200).json({message: "A new verification code has been sent to your email"})

    }
    catch(error){
        next(error)
    }
}

export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        if (!email){
            const error = new Error("Email is required")
            error.statusCode = 400
            throw error
        }

        const user = await User.findOne({ email })
        if (!user){
            const error = new Error ("No account found with this email")
            error.statusCode = 404
            throw error
        }

        const resetPasswordCode = Math.floor(100000 + Math.random() * 900000).toString()
        const resetPasswordCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000)

        user.resetPasswordCode = resetPasswordCode
        user.resetPasswordCodeExpiresAt = resetPasswordCodeExpiresAt
        await user.save()

        await sendEmail({
            to : user.email,
            subject: "Reset your Plateform password",
            html: `<p>Your password reset code is:</p>
            <h2>${resetPasswordCode}</h2>
            <p>This code expires in 10 minutes. If you didn't request this, you can ignore this email. </p>`
        })

        res.status(200).json({message: "A password reset code has been sent to your email"})

    }
    catch(error){
        next(error)
    }
}

export const resetPassword = async (req, res, next) => {
    try{
        const { email, code, newPassword } = req.body
        if(!email || !code || !newPassword){
            const error = new Error("Email, code, and new password are required")
            error.statusCode = 400
            throw error
        }
        const user = await User.findOne({ email }).select("+resetPasswordCode +resetPasswordCodeExpiresAt")
        if(!user){
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }

        if(!user.resetPasswordCode || user.resetPasswordCode !== code){
            const error = new Error("Invalid reset code")
            error.statusCode = 404
            throw error
        }

        if(!user.resetPasswordCodeExpiresAt < new Date()){
            const error = new Error("Reset code has expired. Please request a new one.")
            error.statusCode = 400
            throw error
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(newPassword, salt)
        user.resetPasswordCode = undefined
        user.resetPasswordCodeExpiresAt = undefined
        await user.save()

        res.status(200).json({
            message: "Password reset successfully. You can now log in."
        })
    }
    catch(error){
        next(error)
    }
}
