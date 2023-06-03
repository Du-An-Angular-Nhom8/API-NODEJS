import express from "express";
import { signin, singup } from "../controllers/auth";
import { getAllUser, singup } from "../controllers/auth";


const router = express.Router()

router.post('/signup', singup)
router.post('/signin', signin)


router.get('/users', getAllUser)

export default router