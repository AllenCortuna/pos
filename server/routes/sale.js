import express from "express";
import {
  getSales,
  deleteSale,
  updateSale,
  uploadSale,
  getDailyTotal,
} from "../controlers/sale.js";

const router = express.Router();
// import auth from '../middleware/auth.js'

router.get("/get", getSales);
router.get("/getDaily", getDailyTotal);
router.patch("/patch/:id", updateSale);
router.post("/upload", uploadSale);
router.delete("/delete/:id", deleteSale);

export default router;
