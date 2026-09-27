import bcrypt from "bcryptjs"
import User from "../models/User.js"

export const register = async (req, res) => {
    try{
        const {fullName, email, password, role} = req.body
        const existingUser = await User.findOne({ email })
        if(existingUser){
            return res.status(409).json({ message: "A user with this email already exists"})
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
        res.status(500).json({ message: "Something went wrong", error: error.message})
    }
}
