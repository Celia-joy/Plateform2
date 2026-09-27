import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js"

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
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role
        })
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role
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
