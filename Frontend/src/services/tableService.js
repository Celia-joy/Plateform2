import { apiRequest } from "./api"

export const getTablesByRestaurant = (restaurantId) => {
    return apiRequest(`/tables/restaurant/${restaurantId}`)
}

export const createTable = (tableData) => {
    return apiRequest("/tables", {
        method: "POST",
        body: JSON.stringify(tableData),
    })
}

export const updateTableStatus = (id, status) => {
    return apiRequest(`/tables/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status }),
    })
}

export const deleteTable = (id) => {
    return apiRequest(`/tables/${id}`, {
        method: "DELETE",
    })
}