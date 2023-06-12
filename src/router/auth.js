import express from "express";
import { GetOneUser, RemoveUser, signin, } from "../controllers/auth";
import { getAllUser, signup } from "../controllers/auth";
import { checkPermission } from "../middleware/checkPermisson";
// import { signin, singup } from "../controllers/auth";
// import { getAllUser } from "../controllers/auth";s


const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)


router.get('/users', getAllUser)
router.get('/users/:id', GetOneUser)


router.delete('/user/:id', checkPermission, RemoveUser)

export default router