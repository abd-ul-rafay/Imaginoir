import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/connect-db.js';
import authRoutes from './routes/auth.route.js';
import usersRoutes from './routes/users.route.js';
import imagesRoutes from './routes/images.route.js';
import paymentRoutes from './routes/payment.route.js';
import webhooksRoutes from './routes/webhooks.route.js';
import authentication from './middlewares/authentication.js'
import notFoundMiddleware from './middlewares/not-found.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';

dotenv.config();
const app = express();

app.use(cors());

app.get('/', (req, res) => { 
  res.send('Welcome to Imaginoir API');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', authentication, usersRoutes);
app.use('/api/v1/images', authentication, imagesRoutes);
app.use('/api/v1/payment', authentication, paymentRoutes);

app.use('/api/v1/webhooks', webhooksRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer();
