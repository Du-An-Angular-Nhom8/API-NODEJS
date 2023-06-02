import express from "express";
import { CreateProduct, RemoveProduct, getAll, update } from "../controllers/product";

const router = express.Router()

router.post('/product/add', CreateProduct),
    router.delete('/product/:id', RemoveProduct),
    router.get('/product', getAll)
router.put("/product/:id/edit", update)

export default router