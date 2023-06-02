import express from "express";
import { CreateProduct, RemoveProduct, getAll } from "../controllers/product";

const router = express.Router()

router.post('/product/add', CreateProduct),
    router.delete('/product/:id', RemoveProduct),
    router.get('/product', getAll)

export default router