import express from "express";
import { GetOneUser, signin, } from "../controllers/auth";
import { getAllUser, singup } from "../controllers/auth";


const router = express.Router()

router.post('/signup', singup)
router.post('/signin', signin)


router.get('/users', getAllUser)
router.get('/users/:id', GetOneUser)

export default router