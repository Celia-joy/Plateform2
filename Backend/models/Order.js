import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema(
    {
        menuItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MenuItem"
        },

        names: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1}
    },
    { _id: false }
)

const orderSchema = new mongoose.Schema(
    {
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items: {
            type: [orderItemSchema],
            validate: [(arr) => arr.length > 0, "An order must have at least one item"],
        },

        orderType: {
            type: String,
            enum: ["Dine In", "Takeaway", "Delivery"],
            required: true,
        },

        tableInfo: {
            type: String
        },

        deliveryAddress: {
            type: String,
        },

        specialNote : {
            type : String
        },

        subtotal : { type: Number, required: true},
        serviceFee: { type: Number, required: true},
        deliveryFee: { type: Number, required: true, default: 0},
        total: { type: Number, required: true},
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Ready", "Completed", "Cancelled"],
            default: "Pending"
        }
    },
    { timeStamps: true }
)

const Order = mongoose.model("Order", orderSchema)
export default Order