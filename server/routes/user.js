import express from 'express';
import { patchContact, patchEmail } from '../controlers/profile.js';
const router = express.Router();


import {login,resetPassword, resetPasswordOTP} from '../controlers/user.js';

router.post('/login', login);
router.post('/reset', resetPassword);
router.post('/resetOTP/:id', resetPasswordOTP);
router.patch('/patchContact/:id', patchContact);
router.patch('/patchEmail/:id', patchEmail);

export default router;
