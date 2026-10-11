import { apiRequest } from "./api"

export const getMenuItems = (restaurantId) => {
    return apiRequest(`/menu-items/restaurant/${restaurantId}`)
}

export const createMenuItem = (menuItemData) => {
    return apiRequest("/menu-items", {
        method: "POST",
        body: JSON.stringify(menuItemData),
    })
}

export const updateMenuItem = (id, menuItemData) => {
    return apiRequest(`/menu-items/${id}`, {
        method: "PUT",
        body: JSON.stringify(menuItemData),
    })
}

export const deleteMenuItem = (id) => {
    return apiRequest(`/menu-items/${id}`, {
        method: "DELETE",
    })
}