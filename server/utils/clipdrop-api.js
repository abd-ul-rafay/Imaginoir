import { StatusCodes } from "http-status-codes";
import axios from "axios";
import FormData from 'form-data'
import CustomError from "./custom-error.js";

const generateImageFromPrompt = async (prompt) => {
    const formData = new FormData();
    formData.append('prompt', prompt);

    try {
        const { data } = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'x-api-key': process.env.CLIPDROP_API_KEY,
                },
                responseType: 'arraybuffer',
            }
        );
        return data;
    } catch (error) { 
        throw new CustomError("Failed to generate image from prompt", StatusCodes.BAD_GATEWAY);
    }
};

export default generateImageFromPrompt
