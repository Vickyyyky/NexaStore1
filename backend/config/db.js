import mongoose from "mongoose";

export const connectDB= async ()=>{
    mongoose.connect("mongodb+srv://vk2388275:sGtW9Uq0wZB4Xicu@eccomerce.unjogjx.mongodb.net/")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });

}