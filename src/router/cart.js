import express from "express";
import { checkPermission } from "../middleware/checkPermisson";
import { GetOneCart, addToCart, removeFromCart } from "../controllers/cart";



const router = express.Router()

router.post('/cart/add', addToCart)
router.get('/cart/:id', GetOneCart)
router.delete('/cart/:id', removeFromCart)


export default router