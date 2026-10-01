import mongoose from "mongoose"

const staffSchema = new mongoose.Schema(
    {
        restaurant : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true
        },

        name: {
            type: String,
            required: [true, "Name is required"],
            trim : true
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true
        },

        phone: {
            type: String
        },

        role: {
            type: String,
            enum : ["Manager", "Waitress", "Chef", "Bartender"],
            required: true
        },

        status: {
            type: String,
            enum: ["Active", "On Leave"],
            default: "Active"
        },

        avatarUrl: {
            type: String
        }
    },
    { timeStamps: true }
)

const Staff = mongoose.model("Staff", staffSchema)
export default Staff