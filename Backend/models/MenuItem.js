import mongoose from "mongoose"

const menuItemSchema = new mongoose.Schema(
    {
        restaurant : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true
        },
        category : {
            type: String
        },
        name: {
            type: String,
            required: [true, "Item name is required"],
            trim: true 
        },
        price: {
            type: Number,
            required: [true, "Price is required"]
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            maxLength: 200
        },
        imageUrl: {
            type: String,
        },
        available: {
            type: Boolean,
            default: true,
        }
    },
    {timestamps: true}
)

const MenuItem = mongoose.model("MenuItem", menuItemSchema)
export default MenuItem