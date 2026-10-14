import { apiRequest } from "./api"

export const createBooking = (bookingData) => {
    return apiRequest("/bookings", {
        method: "POST",
        body: JSON.stringify(bookingData),
    })
}

export const getMyBookings = () => {
    return apiRequest("/bookings/my-bookings")
}

export const getBookingsByRestaurant = (restaurantId) => {
    return apiRequest(`/bookings/restaurant/${restaurantId}`)
}

export const updateBookingStatus = (id, status, table) => {
    return apiRequest(`/bookings/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status, table }),
    })
}