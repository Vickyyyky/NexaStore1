import express from "express";
import { addItem, listItem, removeItem } from "../controllers/itemController.js";
import multer from "multer";
import path from "path";

const itemRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // folder where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter (accept any image type)
const fileFilter = (req, file, cb) => {
  console.log("File received:", file.originalname, file.mimetype); // Debug log

  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // accept all images
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes
itemRouter.post("/add", upload.single("image"), addItem);
itemRouter.get("/list", listItem);
itemRouter.delete("/remove/:id", removeItem);

export default itemRouter;
