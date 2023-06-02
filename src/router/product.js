import express  from "express";
import { CreateProduct } from "../controllers/product";

const router = express.Router()

router.post('/product',CreateProduct)

export default router