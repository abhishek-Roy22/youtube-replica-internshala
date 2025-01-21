import 'dotenv/config';
import express from 'express';
import connectDB from './config/dbConnect.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute.js';
import cors from 'cors';
import channleRouter from './routes/channelRoute.js';
import commentRouter from './routes/commentRoute.js';
import videoRouter from './routes/videoRoute.js';
import mongoose from 'mongoose';

const port = process.env.PORT || 5000;

// Connecting to db
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/channel', channleRouter);
app.use('/api/comments', commentRouter);
app.use('/api/videos', videoRouter);

// Define routes
app.get('/', (req, res) => {
  res.send('<h1>Server is running!</h1>');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
