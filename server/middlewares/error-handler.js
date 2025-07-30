import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong. Try again later.',
  };

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors).map(item => item.message).join(', ');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Mongoose Duplicate Key Error
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field. Please choose another value.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Mongoose Cast Error (e.g., invalid ObjectId)
  if (err.name === 'CastError') {
    customError.message = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  // JWT errors (if using jsonwebtoken)
  if (err.name === 'JsonWebTokenError') {
    customError.message = 'Invalid token. Please log in again.';
    customError.statusCode = StatusCodes.UNAUTHORIZED;
  }

  if (err.name === 'TokenExpiredError') {
    customError.message = 'Token expired. Please log in again.';
    customError.statusCode = StatusCodes.UNAUTHORIZED;
  }

  return res.status(customError.statusCode).json({ message: customError.message });
};

export default errorHandlerMiddleware;
