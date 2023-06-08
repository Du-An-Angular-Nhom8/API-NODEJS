import express from "express";
import { checkPermission } from "../middleware/checkPermisson";
import { addToCart } from "../controllers/cart";



const router = express.Router()

router.post('/cart/add', addToCart)



export default router