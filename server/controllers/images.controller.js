import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../utils/custom-error.js';
import cloudinary from '../utils/cloudinary.js';
import User from '../models/User.js';
import Image from '../models/Image.js';
import generateImageFromPrompt from '../utils/clipdrop-api.js';

export const getPublicImages = asyncHandler(async (req, res) => {
    const publicImages = await Image.find({ isPublic: true })
        .sort({ createdAt: -1 })
        .populate('creator', '_id, name'); 

    res.status(StatusCodes.OK).json(publicImages);
});

export const generateImage = asyncHandler(async (req, res) => {
    const { prompt } = req.body;
    const { userId } = req.user;

    const user = await User.findById(userId);

    if (!prompt || !user) {
        throw new CustomError("Prompt and user ID are required", StatusCodes.BAD_REQUEST);
    }

    if (user.credits === 0) {
        throw new CustomError("Insufficient credits", StatusCodes.PAYMENT_REQUIRED);
    }

    const imageBuffer = await generateImageFromPrompt(prompt);
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const dataUri = `data:image/jpeg;base64,${base64Image}`;

    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
        folder: 'imaginoir',
    });
    
    user.credits -= 1;
    await user.save();

    const generatedImage = await Image.create({
        url: uploadResponse.secure_url,
        prompt,
        creator: user._id,
    });

    res.status(StatusCodes.OK).json({ generatedImage, remainingCredits: user.credits });
});

export const getUserImages = asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const userImages = await Image.find({ creator: userId })
        .sort({ createdAt: -1 })
        .populate('creator', '_id, name'); 
        
    res.status(StatusCodes.OK).json(userImages);
});

export const updateImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;
    const { isPublic } = req.body;

    const updatedImage = await Image.findOneAndUpdate(
        { _id: id, creator: userId },
        { isPublic },
        { new: true, runValidators: true }
    );

    if (!updatedImage) {
        throw new CustomError("Image not found", StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json(updatedImage);
});

export const deleteImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;

    const deletedImage = await Image.findOneAndDelete({
        _id: id,
        creator: userId
    });

    if (!deletedImage) {
        throw new CustomError("Image not found", StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json('Image deleted successfully');
});
