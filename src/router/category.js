import express from "express";
import { CreateCategory } from "../controllers/category";


const router = express.Router()

router.post('/category/add', CreateCategory)
   
export default router