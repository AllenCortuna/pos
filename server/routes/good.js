import express from 'express';
import { getGoods,deleteGood,updateGood, uploadGood, getRecentGoods, getMinimum } from '../controlers/good.js'

const router = express.Router();
// import auth from '../middleware/auth.js'


router.get('/get', getGoods);
router.get('/getRecent', getRecentGoods);
router.get('/getMinimum', getMinimum);
router.patch('/patch/:id',updateGood);
router.post('/upload',uploadGood);
router.delete('/delete/:id',deleteGood);
 
export default router;
