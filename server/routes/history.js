import express from "express";
import {
  getHistorys,
  deleteHistory,
  updateHistory,
  uploadHistory,
} from "../controlers/history.js";

const router = express.Router();
// import auth from '../middleware/auth.js'

router.get("/get", getHistorys);
router.patch("/patch/:id", updateHistory);
router.post("/upload", uploadHistory);
router.delete("/delete/:id", deleteHistory);

export default router;
