import mongoose from "mongoose"

const hoursSchema = new mongoose.Schema(
    {
        day: {type: String, required: true},
        open: {type:String},
        close: {type:String},
        isOpen: {type: Boolean, default: true}
    },
    {_id: false}
)

const restaurantSchema = new mongoose.Schema(
    {
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            maxLength: 200
        },
        cuisineType: {
            type: String
        },
        logoUrl: {
            type: String
        },
        coverImageUrl: {
            type: String
        },
        country: String,
        city: String,
        address: String,
        zipCode: String,
        mapLocation: String,
        hours: [hoursSchema],
        phone: String,
        email: String,
        website: String,
        services: [String]
    },
    { timestamps: true }
)

const Restaurant = mongoose.model("Restaurant", restaurantSchema)
export default Restaurant