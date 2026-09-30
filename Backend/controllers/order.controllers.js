import Order from "../models/Order.js"
import MenuItem from "../models/MenuItem.js"

export const createOrder = async (req, res, next) => {
    try{
        const { restaurantId, items, orderType, tableInfo, deliveryAddress, specialNote }  = req.body
        if (!Array.isArray(items) || items.length === 0){
            const error = new Error("An order must include at least one item")
            error.statusCode = 400
            throw error
        }

        const menuItemIds = items.map((item) => item.menuItemId)
        const menuItems = await MenuItem.find({ _id: { $in: menuItemIds }})

        const orderItems = items.map((item) => {
            const menuItem = menuItems.find((m) => m._id.toString() === item.menuItemId)
            if (!menuItem) {
                const error = new Error(`Menu item ${item.menuItemId} not found`)
                error.statusCode = 404
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
    catch(error){
        next(error)
    }
}

export const getOrdersByRestaurant = async (req, res, next) => {
    try{
        const orders = await Order.find({ restaurant: req.params.restaurantId })
            .populate("customer", "fullName email")
            .sort({ createdAt: -1})
        res.status(200).json({ success: true, data: orders })
    }
    catch (error){
        next(error)
    }
}

export const getMyOrders = async (req, res, next) => {
    try{
        const orders = await Order.find({ customer: req.user._id })
            .populate("restaurant", "name city")
            .sort({ createdAt: -1 })
        res.status(200).json({ success: true, data: orders })

    }
    catch(error){
        next(error)
    } 
}

export const updateOrderStatus = async (req, res, next) => {
    try{
        const { status } = req.body
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        )
        if(!order){
            const error = new Error("Order not found")
                error.statusCode = 404
                throw error
        }
        res.status(200).json({ success: true, data: order})

    }
    catch(error){
        next(error)
    }
}