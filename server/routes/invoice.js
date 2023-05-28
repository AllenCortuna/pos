import express from "express";
import {
  getInvoices,
  deleteInvoice,
  updateInvoice,
  uploadInvoice,
  getDailyTotal,
  getMonthlyTotal,
  getQuarterlyTotal,
  getYearly,
  getYearlyTotal
} from "../controlers/invoice.js";

const router = express.Router();
// import auth from '../middleware/auth.js'

router.get("/get", getInvoices);
router.get("/getYear", getYearly);
router.get("/getDaily", getDailyTotal);
router.get("/getMonthly", getMonthlyTotal);
router.get("/getQuarterly", getQuarterlyTotal);
router.get("/getYearly", getYearlyTotal);
router.patch("/patch/:id", updateInvoice);
router.post("/upload", uploadInvoice);
router.delete("/delete/:id", deleteInvoice);

export default router;
