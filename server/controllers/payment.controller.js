import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../utils/custom-error.js';
import stripe from '../utils/stripe.js';
import { prices } from '../utils/consts.js';

export const createCheckoutSession = asyncHandler(async (req, res) => {
    const { priceId } = req.body;
    const { userId } = req.user;

    if (!prices[priceId]) {
        throw new CustomError("Invalid priceId", StatusCodes.BAD_REQUEST);
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: prices[priceId].name,
                },
                unit_amount: prices[priceId].price,
            },
            quantity: 1,
        }],
        success_url: `${process.env.CLIENT_URL}/?status=success`,
        cancel_url: `${process.env.CLIENT_URL}/?status=cancel`,
        metadata: {
            userId,
            priceId,
        },
    });

    res.status(StatusCodes.OK).json(session.url);
})
