import express from "express"
import { addToFav,removeFromFav,getFav } from "../controllers/favController.js"
import authMiddleware from "../middleware/auth.js";

const favRouter= express.Router();

favRouter.post("/add",authMiddleware,addToFav)
favRouter.post("/remove",authMiddleware,removeFromFav)
favRouter.post("/get",authMiddleware,getFav)

export default favRouter;