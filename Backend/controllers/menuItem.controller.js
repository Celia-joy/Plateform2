import MenuItem from "../models/MenuItem.js"
import verifyRestaurantOwnership from "../utils/verifyRestaurantOwnership.js"

export const createMenuItem = async (req, res, next) => {
    try{
        const { restaurantId, category, name, price, description, imageUrl } = req.body
        await verifyRestaurantOwnership(restaurantId, req.user._id)

        const menuItem = await MenuItem.create({
            restaurant: restaurantId,
            category, name, price, description, imageUrl
        })

        res.status(201).json({
            success: true,
            data: menuItem
        })
    }
    catch(error){
        next(error)
    }
}

export const getMenuItemsByRestaurant = async (req, res, next) => {
    try {
        const { category } = req.query
        const filter = { restaurant: req.params.restaurantId }

        if(category && category !== "All") {
            filter.category = category
        }
        const menuItems = await MenuItem.find(filter)
        res.status(200).json({
            success: true,
            data: menuItems
        })
    }
    catch(error){
        next(error)
    }
}

export const updateMenuItem = async (req, res, next) => {
    try{
        const menuItem = await MenuItem.findById(req.params.id)
        if (!menuItem){
            const error = new Error("Menu item not found")
            error.statusCode = 404
            throw error
        }

        await verifyRestaurantOwnership(menuItem.restaurant, req.user._id)
        Object.assign(menuItem, req.body)
        await menuItem.save()

        res.status(200).json({
            success: true,
            data: menuItem
        })
    }
    catch(error){
        next(error)
    }
}

export const deleteMenuItem = async (req, res, next) => {
    try{
        const menuItem = await MenuItem.findById(req.params.id)
        if(!menuItem) {
            const error = new Error("Menu item not found")
            error.statusCode = 404
            throw error
        }
        await verifyRestaurantOwnership(menuItem.restaurant, req.user._id)
        await menuItem.deleteOne()
        res.status(200).json({
            success: true,
            message: "Menu item removed"
        })
    }
    catch(error){
        next(error)
    }
}