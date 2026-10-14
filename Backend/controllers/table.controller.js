import Table from "../models/Table.js"
import verifyRestaurantOwnership from "../utils/verifyRestaurantOwnership.js"

export const getTablesByRestaurant = async (req, res, next) => {
    try {
        const tables = await Table.find({ restaurant: req.params.restaurantId })
        res.status(200).json({
            success: true,
            data: tables
        })
    }
    catch (error) {
        next(error)
    }
}

export const createTable = async (req, res, next) => {
    try {
        const { restaurantId, number, area, capacity } = req.body

        await verifyRestaurantOwnership(restaurantId, req.user._id)

        const existing = await Table.findOne({ restaurant: restaurantId, number, area })
        if (existing) {
            const error = new Error(`Table ${number} already exists in the ${area} area`)
            error.statusCode = 409
            throw error
        }

        const table = await Table.create({ restaurant: restaurantId, number, area, capacity })
        res.status(201).json({ success: true, data: table })
    }
    catch (error) {
        next(error)
    }
}

export const updateTableStatus = async (req, res, next) => {
    try {
        const { status } = req.body

        const table = await Table.findById(req.params.id)
        if (!table) {
            const error = new Error("Table not found")
            error.statusCode = 404
            throw error
        }

        await verifyRestaurantOwnership(table.restaurant, req.user._id)

        table.status = status
        await table.save()

        res.status(200).json({
            success: true,
            data: table
        })
    }
    catch (error) {
        next(error)
    }
}

export const deleteTable = async (req, res, next) => {
    try {
        const table = await Table.findById(req.params.id)
        if (!table) {
            const error = new Error("Table not found")
            error.statusCode = 404
            throw error
        }

        await verifyRestaurantOwnership(table.restaurant, req.user._id)

        await table.deleteOne()

        res.status(200).json({ success: true, message: "Table removed" })
    }
    catch (error) {
        next(error)
    }
}