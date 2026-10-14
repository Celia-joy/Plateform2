import { apiRequest } from "./api"

export const createOrder = (orderData) => {
    return apiRequest("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
    })
}

export const getMyOrders = () => {
    return apiRequest("/orders/my-orders")
}

export const getOrdersByRestaurant = (restaurantId) => {
    return apiRequest(`/orders/restaurant/${restaurantId}`)
}

export const updateOrderStatus = (id, status) => {
    return apiRequest(`/orders/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
    })
}