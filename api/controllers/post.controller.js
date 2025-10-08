import prisma from '../lib/prisma.js';

export const getPosts = async (req, res) => {
    const { city, type, property, bedroom, bathroom, minPrice, maxPrice } =
        req.query;

    try {
        const posts = await prisma.post.findMany({
            where: {
                city: city || undefined,
                type: type || undefined,
                property: property || undefined,
                bedroom: bedroom ? parseInt(bedroom) : undefined,
                bathroom: bathroom ? parseInt(bathroom) : undefined,
                price: {
                    gte: minPrice ? parseInt(minPrice) : undefined,
                    lte: maxPrice ? parseInt(maxPrice) : undefined,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error('getPosts error:', error);
        res.status(500).json({ message: 'Failed to get posts' });
    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
            include: {
                postDetail: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
        res.status(200).json(post);
    } catch (error) {
        console.error('getPost error:', error);
        res.status(500).json({ message: 'Failed to get post' });
    }
};

export const createPost = async (req, res) => {
    const { postData, postDetail } = req.body;
    const tokenUserId = req.userId;

    try {
        if (!tokenUserId) {
            return res
                .status(401)
                .json({ message: 'Missing or invalid user token' });
        }

        const newPost = await prisma.post.create({
            data: {
                ...postData,
                userId: tokenUserId,
                postDetail: {
                    create: postDetail,
                },
            },
        });

        res.status(200).json(newPost);
    } catch (error) {
        console.error('createPost error:', error);
        res.status(500).json({ message: 'Failed to create post' });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const tokenUserId = req.userId;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
        });

        if (post.userId !== tokenUserId) {
            return res
                .status(403)
                .json({ message: 'You are not allowed to delete this post' });
        }

        await prisma.post.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('deletePost error:', error);
        res.status(500).json({ message: 'Failed to delete post' });
    }
};

export const updatePost = async (req, res) => {
    try {
        res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
        console.error('updatePost error:', error);
        res.status(500).json({ message: 'Failed to update post' });
    }
};
