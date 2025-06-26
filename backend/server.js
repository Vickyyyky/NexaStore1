import express from "express";
import cors from "cors";
import 'dotenv/config';
import { connectDB } from "./config/db.js";
import itemRouter from "./routes/itemRoute.js";
import userRouter from "./routes/userRoute.js";
import favRouter from "./routes/favRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/item", itemRouter);
app.use("/api/user", userRouter);
app.use("/api/fav", favRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static('uploads'));

app.get("/", (req, res) => res.send("API Working"));

app.listen(4000, () => console.log("Server started on http://localhost:4000"));
