import express  from "express";
import { CreateProduct, RemoveProduct  } from "../controllers/product";

const router = express.Router()

router.post('/product',CreateProduct),
router.delete('/product/:id', RemoveProduct)

export default router