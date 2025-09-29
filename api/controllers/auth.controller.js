import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
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
    } catch (error) {}

    res.status(201).json({
        message: 'User created successfully',
        username,
        email,
        hashedPassword,
    });
};

export const login = (req, res) => {
    res.json({ message: 'Hello World from auth controller' });
};

export const logout = (req, res) => {
    res.json({ message: 'Hello World from auth controller' });
};
