import { apiRequest } from "./api"

export const createRestaurant = (restaurantData) => {
    return apiRequest("/restaurants", {
        method: "POST",
        body: JSON.stringify(restaurantData),
    })
}

export const getMyRestaurant = () => {
    return apiRequest("/restaurants/mine")
}

export const updateMyRestaurant = (restaurantData) => {
    return apiRequest("/restaurants/mine", {
        method: "PUT",
        body: JSON.stringify(restaurantData),
    })
}

export const getRestaurants = (search = "") => {
    const query = search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ""
    return apiRequest(`/restaurants${query}`)
}

export const getRestaurantById = (id) => {
    return apiRequest(`/restaurants/${id}`)
}