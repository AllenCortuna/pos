import express from 'express';
import { getSuppliers,deleteSupplier,updateSupplier, uploadSupplier } from '../controlers/supplier.js'

const router = express.Router();
// import auth from '../middleware/auth.js'


router.get('/get', getSuppliers);
router.patch('/patch/:id',updateSupplier);
router.post('/upload',uploadSupplier);
router.delete('/delete/:id',deleteSupplier);
 
export default router;
