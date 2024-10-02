const prepareMailData = ({ formData, storeData }) => {
  const oFioField = formData.fields.find((o) => o.field === "fio");
  const newData = {
    fields: [
      {
        label: "Фамилия",
        value: storeData.last_name,
        description: oFioField?.description,
      },
      {
        label: "Имя",
        value: storeData.first_name,
      },
      {
        label: "Отчество",
        value: storeData.patronymic,
      },
    ],
    files: formData.files,
  };
  formData.fields.forEach(({ field, label, value, description }) => {
    if (field === "fio") {
      return;
    }
    newData.fields.push({ label, value, description });
  });
  return newData;
};

export const sendMail = async ({ formData, storeData, title }) => {
  const data = prepareMailData({ formData, storeData });
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const formMailData = new FormData();

  // Генерация HTML-таблицы с группировкой по description
  const generateTable = (fields) => {
    let html = "<table border='1' cellpadding='5' cellspacing='0'>";
    let currentDescription = "";
    const groupedRows = [];

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
        value: fixValue || "",
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

  // Генерация HTML-таблицы
  const tableHTML = generateTable(data.fields);

  // Добавляем данные в formData
  formMailData.append("title", title); // Заголовок письма
  formMailData.append("message", tableHTML); // Содержимое письма как текст

  // Прикрепляем файлы
  const files = data.files;
  for (let i = 0; i < files.length; i++) {
    formMailData.append("files[]", files[i]);
  }

  try {
    // Отправка запроса
    const response = await fetch(`${VITE_BACKEND_URL}/mail`, {
      method: "POST",
      body: formMailData,
      headers: {
        "ngrok-skip-browser-warning": "skip-browser-warning",
      },
    });

    const result = await response.json();
    return {
      valid: true,
      message: result.message,
    };
  } catch (error) {
    return {
      valid: false,
      message: "Произошла ошибка при отправке письма. Попробуйте ещё раз.",
    };
  }
};
