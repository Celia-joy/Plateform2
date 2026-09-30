import { Router } from "express"
import authorize from "../middleware/auth.middleware.js"
import { createBooking, getBookingsByRestaurant, getMyBookings, updateBookingStatus} from "../controllers/booking.controller.js"

const bookingRouter = Router()

bookingRouter.post("/", authorize, createBooking)
bookingRouter.get("/restaurant/:restaurantId", authorize, getBookingsByRestaurant)
bookingRouter.get("/my-bookings", authorize, getMyBookings)
bookingRouter.put("/:id/status", authorize,  updateBookingStatus )

export default bookingRouter