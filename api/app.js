import express from 'express';
import authRouter from './routes/auth.route.js';
import testRouter from './routes/test.route.js';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
console.log('===========Starting Server===========');

// Middleware để parse JSON body
app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/test', testRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
