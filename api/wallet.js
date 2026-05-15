const { connectDB, User } = require('./db');

export default async function handler(req, res) {
    await connectDB();
    if (req.method === 'POST') {
        const { telegramId, username } = req.body;
        let user = await User.findOne({ telegramId });
        if (!user) {
            user = new User({ telegramId, username, balance: 0 });
            await user.save();
        }
        res.status(200).json(user);
    } else {
        res.status(405).send('Method Not Allowed');
    }
}