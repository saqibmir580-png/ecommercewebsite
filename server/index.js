import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import userRoute from "./routes/user.js";
import coursesRoutes from "./routes/courses.js";
import adminRoute from "./routes/admin.js";
import Razorpay from "razorpay";
import cors from 'cors'
dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});
const app = express();
app.use("/uploads", express.static("uploads"));
//using middlewares
app.use(express.json());
app.use(cors())
//routes
app.use("/api", userRoute);
app.use("/api", coursesRoutes);
app.use("/api", adminRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port${port}`);
  connectDb();
});
