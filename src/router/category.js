import express from "express";
import { CreateCategory, updateCategory } from "../controllers/category";


const router = express.Router()

router.post('/category/add', CreateCategory)
router.put('/category/:id/edit', updateCategory)

export default router