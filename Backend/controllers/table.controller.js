import Table from "../models/Table.js"

export const getTableByRestaurant = async (req, res, next) => {
    try{
        const tables = await Table.find({ restaurant: req.params.restaurantId })
        res.status(200).json({ 
            success: true,
            data: tables
        })
    }
    catch(error){
        next(error)
    }
}

export const createTable = async (req, res, next) => {
    try{
        const { restaurantId, number, area, capacity } = req.body
        const table = await Table.create({ restaurant: restaurantId, number, area, capacity })
        res.status(201).json({ success: true, data: table })
    }
    catch(error){
        next(error)
    }
}

export const UpdateTableStatus = async (req, res, next) => {
    try{
        const { status } = req.body
        const table = await Table.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true}
        )

        if(!table){
            const error = new Error("Table not found")
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            success: true,
            data: table
        })
    }
    catch(error){
        next(error)
    }
}