import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.status(200).json(users);
    } catch (error) {
        console.error('getUsers error:', error);
        res.status(500).json({ message: 'Failed to get users' });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        res.status(200).json(user);
    } catch (error) {
        console.error('getUser error:', error);
        res.status(500).json({ message: 'Failed to get user' });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const tokenUserId = req.userId;
    const { avatar, password, ...body } = req.body;

    if (tokenUserId !== id) {
        return res
            .status(403)
            .json({ message: 'You are not allowed to update this user' });
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                ...body,
                avatar: avatar || undefined,
                password: password
                    ? await bcrypt.hash(password, 10)
                    : undefined,
            },
        });

        const updatedUser = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
            },
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get users' });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const tokenUserId = req.userId;

    if (tokenUserId !== id) {
        return res
            .status(403)
            .json({ message: 'You are not allowed to delete this user' });
    }

    try {
        await prisma.user.delete({
            where: {
                id: id,
            },
        });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
};
