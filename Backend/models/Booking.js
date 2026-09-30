import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema(
    {
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        table: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table"
        },

        date: {
            type: String,
            required: true
        },

        time: {
            type: String,
            required: true
        },

        guests: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
            default: "Pending"
        },

        specialRequests: {
            type: String
        }
    },
    { timeStamps: true }
)

const Booking = mongoose.model("Booking", bookingSchema)
export default Booking