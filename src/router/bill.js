import express from "express";

import { GetOneBill, addBill, searchBill } from "../controllers/bill";



const router = express.Router()

router.post('/bill/add', addBill)
router.get('/bill/:id/search', searchBill)
router.get('/bill/:id', GetOneBill)

export default router