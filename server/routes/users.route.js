import express from 'express';
import { getCurrentUser } from '../controllers/users.controller.js';

const router = express.Router();
router.use(express.json()); 

router.get('/me', getCurrentUser);

export default router;
