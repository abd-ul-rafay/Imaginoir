import asyncHandler from 'express-async-handler';
import CustomError from '../utils/custom-error.js';
import { StatusCodes } from 'http-status-codes';
import { OAuth2Client } from "google-auth-library";
import User from '../models/User.js ';

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError('Email and password are required', StatusCodes.BAD_REQUEST);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new CustomError('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }

    if (user.authProvider === 'google') {
        throw new CustomError('This email is registered via Google sign-in. Please use Google to sign in.', StatusCodes.UNAUTHORIZED);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new CustomError('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }

    const { password: _password, ...userData } = user._doc;
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({ user: userData, token });
});

export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new CustomError('Name, email, and password are required', StatusCodes.BAD_REQUEST);
    }

    const user = await User.create({ ...req.body });
    const { password: _password, ...userData } = user._doc;
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({ user: userData, token });
});

export const googleAuth = asyncHandler(async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        throw new CustomError('Google ID token is required', StatusCodes.BAD_REQUEST);
    }

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (user && user.authProvider === 'local') {
        throw new CustomError('This email is registered with a password. Please use regular login.', StatusCodes.UNAUTHORIZED);
    }

    if (!user) {
        user = await User.create({
            name,
            email,
            authProvider: 'google',
        });
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user, token });
});
