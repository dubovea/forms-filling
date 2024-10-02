const express = require("express");
const multer = require("multer");
const cors = require("cors");
const nodemailer = require("nodemailer");
const iconv = require("iconv-lite"); // Добавьте зависимость iconv-lite
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
dotenv.config();

// Получаем токен бота и URL фронтенда
const token = process.env.TELEGRAM_TOKEN;
const webAppUrl = process.env.VITE_FRONTEND_URL;
const bot = new TelegramBot(token, { polling: true });
let chatId = "";
// Команда для отправки URL на фронтенд с кнопкой
bot.onText(/\/start/, (msg) => {
  chatId = msg.chat.id;
  console.log("Новый чат: " + chatId);
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть приложение",
            web_app: { url: webAppUrl },
          },
        ],
      ],
    },
  };
  bot.sendMessage(
    chatId,
    'Привет! Нажмите на кнопку ниже, чтобы открыть наше приложение для заполения формы. При открытии приложения, нажмите на синюю кнопку "Visit Site".',
    options
  );
});

console.log("Telegram бот запущен");

const app = express();
const port = process.env.PORT || 3000;

// Настройка multer для хранения файлов в памяти
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Настройка транспортира для Nodemailer
const transporter = nodemailer.createTransport({
  service: "yandex",
  auth: {
    user: process.env.MAIL_TO,
    pass: process.env.MAIL_PASS,
  },
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// Endpoint для получения списка файлов
app.get("/files", (req, res) => {
  const directoryPath = path.join(__dirname, "documents"); // Путь к папке с файлами

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    // Отправляем имена файлов
    res.json({ success: true, files });
  });
});

// Endpoint для отправки файла
app.post("/send-file", (req, res) => {
  const { fileName } = req.body; // Получаем fileName из тела запроса

  const filePath = path.join(__dirname, "documents", fileName); // Путь к файлу в папке "documents"

  // Проверяем существование файла
  if (!fs.existsSync(filePath)) {
    console.error(`Файл не найден: ${filePath}`);
    return res.status(404).json({ success: false, error: "Файл не найден" });
  }

  console.log(`Отправка файла: ${filePath} в чат: ${chatId}`);

  const stream = fs.createReadStream(filePath);

  bot
    .sendDocument(chatId, stream) // используем просто stream
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      console.error("Ошибка при отправке файла:", error);
      res.status(500).json({ success: false, error: error.message });
    });
});

app.post("/mail", upload.array("files[]"), async (req, res) => {
  const mailOptions = {
    from: process.env.MAIL_TO,
    to: "gazizov.timur.r@gmail.com", // Фиксированный адрес для получения форм
    subject: req.body.title,
    html: req.body.message, // Используем html вместо text для отправки HTML-контента
  };

  const mailOptions2 = {
    from: process.env.MAIL_TO,
    to: process.env.MAIL_TO, // Фиксированный адрес для получения форм
    subject: req.body.title,
    html: req.body.message, // Используем html вместо text для отправки HTML-контента
  };

  if (req.files) {
    mailOptions["attachments"] = req.files.map((file) => ({
      filename: iconv.decode(Buffer.from(file.originalname, "binary"), "utf8"), // Декодируйте имя файла
      content: file.buffer,
    }));
    mailOptions2["attachments"] = req.files.map((file) => ({
      filename: iconv.decode(Buffer.from(file.originalname, "binary"), "utf8"), // Декодируйте имя файла
      content: file.buffer,
    }));
  }

  // Отправка письма
  try {
    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(mailOptions2),
    ]);

    res.json({ message: "Форма успешно отправлена!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка при отправке письма" });
    return;
  }
});

app.listen(port, () => {
  console.log(`Бэкенд сервер запущен на порту ${port}`);
});
