const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('እንኳን ወደ Lucky Bingo መጣችሁ! 🎰', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "🎮 ጨዋታውን ጀምር", web_app: { url: "https://lucky-bingo-bot.vercel.app" } }]
            ]
        }
    });
});

module.exports = async (req, res) => {
    if (req.body) await bot.handleUpdate(req.body);
    res.status(200).send('OK');
};