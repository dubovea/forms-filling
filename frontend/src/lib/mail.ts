export const sendMail = async ({ data, title }) => {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const formData = new FormData();

  // Генерация HTML-таблицы с группировкой по description
  const generateTable = (fields) => {
    let html = "<table border='1' cellpadding='5' cellspacing='0'>";
    let currentDescription = null;
    let groupedRows = [];

    // Группировка полей по description
    fields.forEach((field) => {
      const { label, value, description } = field;
      const fixValue =
        typeof value === "boolean" ? (value ? "Да" : "Нет") : value;

      // Если описание есть и оно отличается от текущего, начинаем новую группу
      if (description && description !== currentDescription) {
        currentDescription = description;
        groupedRows.push({ description, rows: [] });
      }

      // Добавляем поле в текущую группу (или пустую группу)
      if (groupedRows.length === 0) {
        groupedRows.push({ description: "", rows: [] });
      }

      groupedRows[groupedRows.length - 1].rows.push({
        label,
        value: fixValue || ""
      });
    });

    // Генерация HTML-таблицы
    groupedRows.forEach((group) => {
      const { description, rows } = group;
      rows.forEach((row, index) => {
        // Для первой строки группы отображаем объединённую ячейку для description
        if (index === 0 && description) {
          html += `<tr>
                    <td rowspan="${rows.length}"><strong>${description}</strong></td>
                    <td>${row.label}</td>
                    <td>${row.value}</td>
                   </tr>`;
        } else {
          // Для остальных строк добавляем только label и value
          html += `<tr>
                    <td>${row.label}</td>
                    <td>${row.value}</td>
                   </tr>`;
        }
      });
    });

    html += "</table>";
    return html;
  };

  const tableHTML = generateTable(data.fields);

  formData.append("title", title);
  formData.append("message", tableHTML);
  formData.append("html", tableHTML); // Указываем, что это HTML-формат

  const files = data.files;
  for (let i = 0; i < files.length; i++) {
    formData.append("files[]", files[i]);
  }

  try {
    const response = await fetch(`${VITE_BACKEND_URL}/mail`, {
      headers: {
        "ngrok-skip-browser-warning": "skip-browser-warning",
        "Content-Type": "text/html" // Указываем тип контента как HTML
      },
      method: "POST",
      body: formData,
    }).then((o) => o.json());

    return response.message;
  } catch (error) {
    return error.message;
  }
};
