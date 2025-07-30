import { StatusCodes } from 'http-status-codes';
import CustomError from '../utils/custom-error.js';
import stripe from '../utils/stripe.js';
import User from '../models/User.js';
import { prices } from '../utils/consts.js';

export const stripeWebhookHandler = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        throw new CustomError("Webhook Error", StatusCodes.BAD_REQUEST);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata.userId;
        const priceId = session.metadata.priceId;

        try {
            const priceData = prices[priceId];

            if (!priceData) {
                throw new CustomError("Invalid priceId", StatusCodes.BAD_REQUEST);
            }

            const user = await User.findById(userId);
            if (!user) {
                throw new CustomError("User not found", StatusCodes.NOT_FOUND);
            }

            user.credits += priceData.credits;
            await user.save();
        } catch (err) {
            return res.status(500).send("Server Error");
        }
    }


    res.status(200).send('Received');
};
