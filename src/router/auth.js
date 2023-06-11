import express from "express";
import { GetOneUser, signin, } from "../controllers/auth";
import { getAllUser, signup } from "../controllers/auth";
// import { signin, singup } from "../controllers/auth";
// import { getAllUser } from "../controllers/auth";s


const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)


router.get('/users', getAllUser)
router.get('/users/:id', GetOneUser)

export default router