export const sendMail = async ({ data, title }) => {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const formData = new FormData();
  const sMessage = Object.values(data.fields).reduce((acc, val) => {
    const fixValue =
      typeof val.value === "boolean" ? (val.value ? "Да" : "Нет") : val.value;
    acc += `${val.label}: ${fixValue} \n`;
    return acc;
  }, "");
  formData.append("title", title);
  formData.append("message", sMessage);

  const files = data.files;
  for (let i = 0; i < files.length; i++) {
    formData.append("files[]", files[i]);
  }
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/mail`, {
      headers: {
        "ngrok-skip-browser-warning": "skip-browser-warning",
      },
      method: "POST",
      body: formData,
    }).then((o) => o.json());
    return response.message;
  } catch (error) {
    return error.message;
  }
};
