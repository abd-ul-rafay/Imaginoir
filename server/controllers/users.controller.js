import asyncHandler from 'express-async-handler';
import User from '../models/User.js'
import CustomError from '../utils/custom-error.js'
import { StatusCodes } from 'http-status-codes'

export const getCurrentUser = asyncHandler(async (req, res) => {
    const { userId } = req.user;

    if (!userId) {
        throw new CustomError("User ID is required", StatusCodes.BAD_REQUEST)
    }

    const user = await User.findById(userId)
    res.status(StatusCodes.OK).json(user)
});
