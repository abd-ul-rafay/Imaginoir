import express from 'express';
import { stripeWebhookHandler } from '../controllers/webhooks.controller.js';
import bodyParser from 'body-parser';

const router = express.Router();
router.post(
    '/payment',
    bodyParser.raw({ type: 'application/json' }),
    stripeWebhookHandler
);

export default router;
