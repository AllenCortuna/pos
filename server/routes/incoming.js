import express from "express";
import {
  getIncomings,
  deleteIncoming,
  updateIncoming,
  uploadIncoming,
} from "../controlers/incoming.js";

const router = express.Router();
// import auth from '../middleware/auth.js'

router.get("/get", getIncomings);
router.patch("/patch/:id", updateIncoming);
router.post("/upload", uploadIncoming);
router.delete("/delete/:id", deleteIncoming);

export default router;
