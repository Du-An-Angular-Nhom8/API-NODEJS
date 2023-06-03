import express from "express";
import { signin, singup } from "../controllers/auth";


const router = express.Router()

router.post('/signup', singup)
router.post('/signin', signin)


export default router