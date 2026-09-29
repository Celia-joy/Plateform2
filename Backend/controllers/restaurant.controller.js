import Restaurant from "../models/Restaurant.js"
import MenuItem from "../models/MenuItem.js"

export const createRestaurant = async(req, res, next) => {
    try {
        if(req.user.role !== "restaurant"){
            const error = new Error("Only restaurant accounts can create a restaurant profile")
            error.statusCode = 403
            throw error
        }

        const existingRestaurant = await Restaurant.findOne({owner: req.user._id})
        if(existingRestaurant){
            const error = new Error("This account already has a restaurant profile")
            error.statusCode = 409
            throw error
        }

        const {
            name, description, cuisineType, logoUrl, coverImageUrl,
            country, city, address, zipCode, mapLocation,
            hours, phone, email, website, services, menuItems
        } = req.body

        const newRestaurant = await Restaurant.create({
            owner: req.user._id,
            name,description, cuisineType, logoUrl, coverImageUrl,
            country, city, address, zipCode, mapLocation,
            hours, phone, email, website, services,
        })
        let createdMenuItems = []
        if (Array.isArray(menuItems) && menuItems.length > 0){
            const itemsWithRestaurantId = menuItems.map((item) => ({
                ...item,
                restaurant: newRestaurant._id
            }))
            createdMenuItems = await MenuItem.insertMany(itemsWithRestaurantId)
        }

        res.status(201).json({
            success:true,
            message: "Restaurant profile created successfully",
            data: {
                restaurant: newRestaurant,
                menuItems: createdMenuItems
            }
        })
    }
    catch(error){
        next(error)
    }
}

export const getRestaurants = async (req, res, next) =>{
    try{
        const { search, city } = req.query
        const filter = {}
        if (city) {
            filter.city = city.toLowerCase()
        }
        if(search){
            filter.$or = [
                { name: {$regex: search, $options: "i"} },
                { cuisineType: { $regex: search, $options: "i"} }
            ]
        }

        const restaurants = await Restaurant.find(filter)
        res.status(200).json({
            success: true,
            count: restaurants.length,
            data: restaurants
        })

    }
    catch(error){
        next(error)
    }
}

export const getRestaurantById = async (req, res, next) =>{
    try{
        const restaurant = await Restaurant.findById(req.params.id)

        if(!restaurant){
            const error = new Error("Restaurant not found")
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            success: true,
            data: restaurant
        })
    }
    catch(error){
        next(error)
    }
}