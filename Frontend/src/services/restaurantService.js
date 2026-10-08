import { apiRequest } from "./api"
export const createRestaurant = (restaurantData) => {
    return apiRequest("/restaurants", {
        method: "POST",
        body: JSON.stringify(restaurantData)
    })
}