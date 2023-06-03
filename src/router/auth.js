import express from "express";
import { singup } from "../controllers/auth";


const router = express.Router()

router.post('/signup', singup)

export default router