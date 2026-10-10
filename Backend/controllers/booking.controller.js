import Booking from "../models/Booking.js"
import verifyRestaurantOwnership from "../utils/verifyRestaurantOwnership.js"

export const createBooking = async (req, res, next) => {
    try {
        const { restaurantId, table, date, time, guests, specialRequests } = req.body
        const booking = await Booking.create({
            restaurant: restaurantId,
            customer: req.user._id,
            table,
            date,
            time,
            guests,
            specialRequests
        })
        res.status(201).json({ success: true, data: booking })
    }
    catch (error) {
        next(error)
    }
}

export const getBookingsByRestaurant = async (req, res, next) => {
    try {
        await verifyRestaurantOwnership(req.params.restaurantId, req.user._id)

        const bookings = await Booking.find({ restaurant: req.params.restaurantId })
            .populate("customer", "fullName email")
            .populate("table")

        res.status(200).json({ success: true, data: bookings })
    }
    catch (error) {
        next(error)
    }
}

export const getMyBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ customer: req.user._id })
            .populate("restaurant", "name city address")
            .populate("table")

        res.status(200).json({ success: true, data: bookings })
    }
    catch (error) {
        next(error)
    }
}

export const updateBookingStatus = async (req, res, next) => {
    try {
        const { status } = req.body

        const booking = await Booking.findById(req.params.id)
        if (!booking) {
            const error = new Error("Booking not found")
            error.statusCode = 404
            throw error
        }

        const isBookingCustomer = booking.customer.toString() === req.user._id.toString()

        if (isBookingCustomer) {
            if (status !== "Cancelled") {
                const error = new Error("Customers can only cancel their own bookings")
                error.statusCode = 403
                throw error
            }
        } else {
            await verifyRestaurantOwnership(booking.restaurant, req.user._id)
        }

        booking.status = status
        await booking.save()

        res.status(200).json({ success: true, data: booking })
    }
    catch (error) {
        next(error)
    }
}