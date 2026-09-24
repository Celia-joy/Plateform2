import mongoose from 'mongoose'
import { MONGO_URI } from '../config/env.js'

const connectDB = async () => {
    if(!MONGO_URI){
        throw new Error('Please specify the MONGO_URI environment variable inside .env')
    }
    try{
        await mongoose.connect(MONGO_URI)
        console.log(`MongoDB connected successfully in ${process.env.NODE_ENV}`)
    }
    catch(error){
        console.error("MongoDB connection error:", error.message)
        process.exit(1)
    }
}

export default connectDB