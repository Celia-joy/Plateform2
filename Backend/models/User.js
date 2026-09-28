import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type:String,
            required:[true, "Full name is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            select: false
        },
        role: {
            type: String,
            enum: ["customer", "restaurant"],
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationCode: {
            type: String,
            select: false
        },
        verificationCodeExpiresAt: {
            type: Date,
            select: false
        }
    },
    {
        timestamps: true
    }

)
const User = mongoose.model("User", userSchema)
export default User