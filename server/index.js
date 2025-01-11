import 'dotenv/config';
import express from 'express';
import connectDB from './config/dbConnect.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute.js';

const port = process.env.PORT || 5000;

// Connecting to db
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRouter);

// Define routes
app.get('/', (req, res) => {
  res.send('<h1>Server is running!</h1>');
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
