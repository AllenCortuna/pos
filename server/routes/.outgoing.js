import express from 'express';
import { getOutgoings,deleteOutgoing,updateOutgoing, uploadOutgoing } from '../controlers/outgoing.js'

const router = express.Router();
// import auth from '../middleware/auth.js'


router.get('/get', getOutgoings);
router.patch('/patch/:id',updateOutgoing);
router.post('/upload',uploadOutgoing);
router.delete('/delete/:id',deleteOutgoing);
 
export default router;
