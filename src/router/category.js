import express from "express";
import { CreateCategory, DeleteCategory, GetAllCategory, updateCategory } from "../controllers/category";


const router = express.Router()

router.post('/category/add', CreateCategory)
router.put('/category/:id/edit', updateCategory)
router.get('/category', GetAllCategory)
router.delete('/category/:id', DeleteCategory)


export default router