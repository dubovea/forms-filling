const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
dotenv.config();

// Получаем токен бота и URL фронтенда
const token = process.env.TELEGRAM_TOKEN;
const webAppUrl = process.env.VITE_FRONTEND_URL;

const bot = new TelegramBot(token, { polling: true });

// Команда для отправки URL на фронтенд с кнопкой
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Открыть приложение',
                        web_app: { url: webAppUrl }
                    }
                ]
            ]
        }
    };
    bot.sendMessage(chatId, 'Привет! Нажмите на кнопку ниже, чтобы открыть наше приложение:', options);
});

console.log("Telegram бот запущен");
