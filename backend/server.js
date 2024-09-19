const express = require("express");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const iconv = require("iconv-lite"); // Добавьте зависимость iconv-lite
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
// Настройка multer для хранения файлов в памяти
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Настройка транспортира для Nodemailer
const transporter = nodemailer.createTransport({
  service: "yandex",
  auth: {
    user: "atlets-sport@yandex.ru",
    pass: "hpcovingoflylfpn",
  },
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.post("/mail", upload.array("files[]"), async (req, res) => {
  const mailOptions = {
    from: "atlets-sport@yandex.ru",
    to: "gazizov.timur.r@gmail.com", // Фиксированный адрес для получения форм
    subject: req.body.title,
    text: req.body.message,
  };

  const mailOptions2 = {
    from: "atlets-sport@yandex.ru",
    to: "atlets-sport@yandex.ru", // Фиксированный адрес для получения форм
    subject: req.body.title,
    text: req.body.message,
  };

  if (req.files) {
    mailOptions["attachments"] = req.files.map((file) => ({
      filename: iconv.decode(Buffer.from(file.originalname, "binary"), "utf8"), // Декодируйте имя файла
      content: file.buffer,
    }));
  }
  // Отправка письма
  try {
    Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(mailOptions2),
    ])
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    res.json({ message: "Форма успешно отправлена!" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при отправке письма" });
    return;
  }
});

app.listen(port, () => {
  console.log(`Бэкенд сервер запущен на порту ${port}`);
});
