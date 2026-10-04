import Restaurant from "../models/Restaurant.js"

const verifyRestaurantOwnership = async (getRestaurantById, userId) => {
    const restaurant = await Restaurant.findById(restaurantId)
    if(!restaurant){
        const error = new Error("Restaurant not found")
        error.statusCode = 404
        throw error
    }

    if(restaurant.owner.toString() !== userId.toString()){
        const error = new Error("You do not have permission to manage this restaurant")
        error.statusCode = 403
        throw error
    }
    return restaurant
}

export default verifyRestaurantOwnership