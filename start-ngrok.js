const ngrok = require("ngrok");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

async function fetchEnvData({ envPath, frontendUrl, backendUrl }) {
  let envData = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  const newEnvData = {};
  // Разбиваем существующие данные на строки и обрабатываем
  envData.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key) newEnvData[key.trim()] = value ? value.trim() : "";
  });
  // Обновляем значения или добавляем новые
  newEnvData["VITE_BACKEND_URL"] = backendUrl;
  newEnvData["VITE_FRONTEND_URL"] = frontendUrl;
  // Формируем новое содержимое файла .env
  const updatedEnvData = Object.entries(newEnvData)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  await fs.writeFileSync(envPath, updatedEnvData);
}

const updateEnvFile = async (backendUrl, frontendUrl) => {
  const envFilePath = ".env";
  const frontEnvFilePath = "./frontend/.env";
  const backendEnvFilePath = "./backend/.env";
  const botEnvFilePath = "./telegram-bot/.env";

  try {
    await fetchEnvData({ envPath: envFilePath, frontendUrl, backendUrl });
    await fetchEnvData({ envPath: frontEnvFilePath, frontendUrl, backendUrl });
    await fetchEnvData({
      envPath: backendEnvFilePath,
      frontendUrl,
      backendUrl,
    });
    await fetchEnvData({
      envPath: botEnvFilePath,
      frontendUrl,
      backendUrl,
    });
    console.log(".env файл обновлен!");
  } catch (err) {
    console.error("Ошибка при обновлении .env файла:", err.message, err.stack);
  }
};

(async function () {
  try {
    console.log("Авторизация Ngrok...");
    await ngrok.authtoken(process.env.NGROK_AUTHTOKEN);

    console.log("Запуск туннеля для frontend на порту 5173...");
    const frontendUrl = await ngrok.connect(5173);
    console.log(`Ngrok tunnel for frontend: ${frontendUrl}`);

    console.log("Запуск туннеля для backend на порту 3000...");
    const backendUrl = await ngrok.connect(3000);
    console.log(`Ngrok tunnel for backend: ${backendUrl}`);

    // Обновляем .env файл с полученными URL
    await updateEnvFile(backendUrl, frontendUrl);
  } catch (err) {
    console.error("Ошибка при запуске:", err.message, err.stack);
  }
})();
