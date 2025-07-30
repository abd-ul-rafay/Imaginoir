import express from 'express';
import { createCheckoutSession } from '../controllers/payment.controller.js';

const router = express.Router();
router.use(express.json());

router.post('/session', createCheckoutSession);

export default router;
