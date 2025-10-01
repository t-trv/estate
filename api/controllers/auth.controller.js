import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Kiểm tra xem username đã tồn tại hay chưa
        const existingUsername = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Kiểm tra xem email đã tồn tại hay chưa
        const existingEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        //   Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //   Tạo một người dùng mới rồi lưu vào database
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                avatar: '',
            },
        });

        console.log(`New user created: ${newUser.username}`);
        res.status(201).json({
            message: 'User created successfully',
        });
    } catch (error) {
        console.error('Register user error:', error);

        res.status(500).json({
            message: 'Failed to register user',
        });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Kiểm tra xem user có tồn tại hay không
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (!user)
            return res
                .status(401)
                .json({ message: 'Invalid username or password' });

        // Kiểm tra xem password có đúng hay không
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect)
            return res
                .status(401)
                .json({ message: 'Invalid username or password' });

        // Tạo cookie token và gửi đến client
        const age = 1000 * 60 * 60 * 24 * 7; // 7 days

        const token = jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );

        console.log(`User logged in: ${user.username}`);

        res.cookie('token', token, {
            httpOnly: true,
            // secure: true,
            maxAge: age,
        })
            .status(200)
            .json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login user error:', error);

        res.status(500).json({
            message: 'Failed to login user',
        });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie('token')
            .status(200)
            .json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout user error:', error);
        res.status(500).json({ message: 'Failed to logout user' });
    }
};
