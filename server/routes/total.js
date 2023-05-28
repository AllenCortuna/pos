import express from "express";
import { getMontlyGood, getTotals } from "../controlers/total.js";

const router = express.Router();
// import auth from '../middleware/auth.js'

router.get("/get", getTotals);
router.get("/getMonthly", getMontlyGood);

export default router;
