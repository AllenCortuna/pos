import express from "express";
import {
  getDrawers,
  deleteDrawer,
  updateDrawer,
  uploadDrawer,
  getDailyTotal,
} from "../controlers/drawer.js";

const router = express.Router();
// import auth from '../middleware/auth.js'

router.get("/get", getDrawers);
router.get("/getDaily", getDailyTotal);
router.patch("/patch/:id", updateDrawer);
router.post("/upload", uploadDrawer);
router.delete("/delete/:id", deleteDrawer);

export default router;
