import Staff from "../models/Staff.js"
import Restaurant from "../models/Restaurant.js"
import verifyRestaurantOwnership from "../utils/verifyRestaurantOwnership.js"

export const createStaff = async (req, res, next) => {
    try{
        const { restaurantId, name, email, phone, role, avatarUrl} = req.body
        await verifyRestaurantOwnership(restaurantId, req.user._id)
        const staff = await Staff.create({
            restaurant: restaurantId,
            name, email, phone, role, avatarUrl
        })
        res.status(201).json({ success: true, data: staff })
    }
    catch(error){
        next(error)
    }
}

export const getStaffByRestaurant = async (req, res, next) => {
    try{
        await verifyRestaurantOwnership(req.params.restaurantId, req.user._id)
        const staffList = await Staff.find({ restaurant: req.params.restaurantId })
        res.status(200).json({ success: true, data: staffList })
    }
    catch(error){
        next(error)
    }
}

export const updateStaff = async (req, res, next) => {
    try{
        const staff = await Staff.findById(req.params.id)
        if(!staff){
            const error = new Error("Staff member not found")
            error.statusCode = 404
            throw error
        }
        await verifyRestaurantOwnership(staff.restaurant, req.user._id)
        Object.assign(staff, req.body)
        await staff.save()

        res.status(200).json({ success: true, data: staff})

    }
    catch(error){
        next(error)
    }
}

export const deleteStaff = async (req, res, next) => {
    try{
        const staff = await Staff.findById(req.params.id)
        if(!staff){
            const error = new Error("Staff member not found")
            error.statusCode = 404
            throw error
        }

        await verifyRestaurantOwnership(staff.restaurant, req.user._id)
        await staff.deleteOne()

        res.status(200).json({ success: true, message: "Staff member removed"})

    }
    catch(error){
        next(error)
    }
}