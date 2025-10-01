export const shouldBeLoggedIn = (req, res) => {
    console.log(req.userId);

    res.status(200).json({ message: 'Logged in' });
};

export const shouldBeAdmin = async (req, res) => {
    console.log(req.userId);

    res.status(200).json({ message: 'Logged in' });
};
