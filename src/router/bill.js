import express from "express";

import { addBill } from "../controllers/bill";



const router = express.Router()

router.post('/bill/add', addBill)



export default router