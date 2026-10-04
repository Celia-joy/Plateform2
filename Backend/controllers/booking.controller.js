import Booking from "../models/Booking.js"

export const createBooking = async (req, res, next) => {
    try{
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
        res.status(201).json({ success: true, data: booking})
    }
    catch(error){
        next(error)
    }
}

export const getBookingsByRestaurant = async (req, res, next) => {
    try{
        const bookings = await Booking.find({ restaurant: req.params.restaurantId })
            .populate("customer", "fullName email")
            .populate("table")

        res.status(200).json({ success: true, data: bookings })
    }
    catch(error){
        next(error)
    }
}

export const getMyBookings = async (req, res, next) => {
    try{
        const bookings = await Booking.find({ customer: req.user._id })
            .populate("restaurant", "name city address")
            .populate("table")
        
        res.status(200).json({ success: true, data: bookings })
    }
    catch(error){
        next(error)
    }
}

export const updateBookingStatus = async (req, res, next) => {
    try{
        const { status } = req.body
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true}
        )

        if(!booking){
            const error = new Error ("Booking not found")
            error.statusCode = 404
            throw error
        }

        res.status(200).json({ success: true, data: booking })

    }
    catch(error){
        next(error)
    }
}

