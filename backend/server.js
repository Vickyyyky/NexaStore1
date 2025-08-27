import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import itemRouter from "./routes/itemRoute.js";
import userRouter from "./routes/userRoute.js";
import favRouter from "./routes/favRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

// ✅ Allow localhost (dev) + deployed frontend (prod)
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true   // if you are using cookies or auth headers
}));


app.use(express.json());

// ✅ Connect MongoDB
connectDB();

// ✅ API routes
app.use("/api/item", itemRouter);
app.use("/api/user", userRouter);
app.use("/api/fav", favRouter);
app.use("/api/order", orderRouter);

// ✅ Serve uploaded images
app.use("/images", express.static("uploads"));

// ✅ Test route
app.get("/", (req, res) => res.send("API Working ✅"));

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Server started on http://localhost:${PORT}`)
);
