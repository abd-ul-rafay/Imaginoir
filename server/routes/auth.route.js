import express from 'express';
import { login, register, googleAuth } from '../controllers/auth.controller.js';

const router = express.Router();
router.use(express.json()); 

router.post('/login', login);
router.post('/register', register);
router.post('/google', googleAuth);

export default router;
