import mongoose from "mongoose"

const tableSchema = new mongoose.Schema(
    {
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "restaurant",
            required: true
        },

        number: {
            type: Number,
            required: true
        },

        area: {
            type: String,
            enum: ["Indoor", "Outdoor"],
            required: true
        },

        status: {
            type: String,
            enum: ["available", "booked", "occupied", "maintenance"],
            default: "available"
        },

        capacity: {
            type: Number,
            default: 4
        }
    },
    { timeStamps: true }
)

const Table = mongoose.model("Table", tableSchema)
export default Table