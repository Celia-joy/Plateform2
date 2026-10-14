import { apiRequest } from "./api"

export const getStaff = (restaurantId) => {
    return apiRequest(`/staff/restaurant/${restaurantId}`)
}

export const createStaff = (staffData) => {
    return apiRequest("/staff", {
        method: "POST",
        body: JSON.stringify(staffData),
    })
}

export const updateStaff = (id, staffData) => {
    return apiRequest(`/staff/${id}`, {
        method: "PUT",
        body: JSON.stringify(staffData),
    })
}

export const deleteStaff = (id) => {
    return apiRequest(`/staff/${id}`, {
        method: "DELETE",
    })
}