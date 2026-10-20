import Order from "../models/Order.js"
import MenuItem from "../models/MenuItem.js"
import Restaurant from "../models/Restaurant.js"
import verifyRestaurantOwnership from "../utils/verifyRestaurantOwnership.js"

export const createOrder = async (req, res, next) => {
    try {
        if (req.user.role !== "customer") {
            const error = new Error("Only customer accounts can place orders")
            error.statusCode = 403
            throw error
        }

        const { restaurantId, items, orderType, tableInfo, deliveryAddress, specialNote } = req.body

        if (!restaurantId) {
            const error = new Error("A restaurant is required")
            error.statusCode = 400
            throw error
        }

        const restaurant = await Restaurant.findById(restaurantId)
        if (!restaurant) {
            const error = new Error("Restaurant not found")
            error.statusCode = 404
            throw error
        }

        if (!Array.isArray(items) || items.length === 0) {
            const error = new Error("An order must include at least one item")
            error.statusCode = 400
            throw error
        }

        const quantitiesAreValid = items.every(
            (item) => Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= 50
        )
        if (!quantitiesAreValid) {
            const error = new Error("Each item quantity must be a whole number between 1 and 50")
            error.statusCode = 400
            throw error
        }

        // Only look for dishes that belong to THIS restaurant
        const menuItemIds = items.map((item) => item.menuItemId)
        const menuItems = await MenuItem.find({ _id: { $in: menuItemIds }, restaurant: restaurantId })

        const orderItems = items.map((item) => {
            const menuItem = menuItems.find((m) => m._id.toString() === item.menuItemId)
            if (!menuItem) {
                const error = new Error("One of the items is not on this restaurant's menu")
                error.statusCode = 404
                throw error
            }
            if (!menuItem.available) {
                const error = new Error(`${menuItem.name} is currently unavailable`)
                error.statusCode = 400
                throw error
            }
            return {
                menuItem: menuItem._id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: item.quantity
            }
        })

        const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const serviceFee = Math.round(subtotal * 0.05 * 100) / 100
        const deliveryFee = orderType === "Delivery" ? 2.0 : 0
        const total = subtotal + serviceFee + deliveryFee

        const order = await Order.create({
            restaurant: restaurantId,
            customer: req.user._id,
            items: orderItems,
            orderType,
            tableInfo,
            deliveryAddress,
            specialNote,
            subtotal,
            serviceFee,
            deliveryFee,
            total
        })
        res.status(201).json({ success: true, data: order })
    }
    catch (error) {
        next(error)
    }
}

export const getOrdersByRestaurant = async (req, res, next) => {
    try {
        await verifyRestaurantOwnership(req.params.restaurantId, req.user._id)

        const orders = await Order.find({ restaurant: req.params.restaurantId })
            .populate("customer", "fullName email")
            .sort({ createdAt: -1 })

        res.status(200).json({ success: true, data: orders })
    }
    catch (error) {
        next(error)
    }
}

export const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ customer: req.user._id })
            .populate("restaurant", "name city")
            .sort({ createdAt: -1 })

        res.status(200).json({ success: true, data: orders })
    }
    catch (error) {
        next(error)
    }
}

export const updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body

        const order = await Order.findById(req.params.id)
        if (!order) {
            const error = new Error("Order not found")
            error.statusCode = 404
            throw error
        }

        const isOrderCustomer = order.customer.toString() === req.user._id.toString()

        if (isOrderCustomer) {
            if (status !== "Cancelled" || order.status !== "Pending") {
                const error = new Error("Customers can only cancel their own orders while they are still Pending")
                error.statusCode = 403
                throw error
            }
        } else {
            await verifyRestaurantOwnership(order.restaurant, req.user._id)
        }

        order.status = status
        await order.save()

        res.status(200).json({ success: true, data: order })
    }
    catch (error) {
        next(error)
    }
}