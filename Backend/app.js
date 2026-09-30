import express from "express";
import cors from "cors";
import connectDB from "./database/mongodb.js"
import { PORT } from "./config/env.js"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import errorMiddleware from "./middleware/error.middleware.js"
import restaurantRouter from "./routes/restaurant.routes.js"
import tableRouter from "./routes/table.routes.js"
import bookingRouter from "./routes/booking.routes.js"
import orderRouter from "./routes/order.routes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get("/", (req, res)=>{
    res.send("Plateform backend is running");
});
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use("/api/restaurants", restaurantRouter)
app.use("/api/tables", tableRouter)
app.use("/api/bookings", bookingRouter)
app.use("/api/orders", orderRouter)

app.use(errorMiddleware)

app.listen(PORT, async()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectDB();
});