import express from "express";
import cors from "cors";
import connectDB from "./database/mongodb.js"
import { PORT } from "./config/env.js"
import authRouter from "./routes/auth.routes.js"


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req, res)=>{
    res.send("Plateform backend is running");
});
app.use('/api/auth', authRouter)

app.listen(PORT, async()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectDB();
});