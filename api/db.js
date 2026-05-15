const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected!");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
    }
};

const UserSchema = new mongoose.Schema({
    telegramId: String,
    username: String,
    balance: { type: Number, default: 0 },
    phoneNumber: String
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = { connectDB, User };