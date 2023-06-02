import express from "express";
import { CreateCategory, GetAllCategory, updateCategory } from "../controllers/category";


const router = express.Router()

router.post('/category/add', CreateCategory)
router.put('/category/:id/edit', updateCategory)
router.get('/category', GetAllCategory)


export default router