import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../utils/custom-error.js';

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new CustomError('Authentication invalid', StatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };

    next();
  } catch (error) {
    throw new CustomError('Authentication invalid', StatusCodes.UNAUTHORIZED);
  }
};

export default authentication;
