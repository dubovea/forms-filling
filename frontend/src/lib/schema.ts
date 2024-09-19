import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

// Схема валидации с использованием superRefine
export const applicationFormSchema = z.object({
  files: z.array(z.instanceof(File)).optional(), // Используйте массив файлов
  fields: z.array(
    z
      .object({
        field: z.string(),
        hidden: z.boolean().optional(),
        type: z.string(),
        label: z.string(),
        format: z.string().optional(),
        filePath: z.string().optional(),
        value: z.union([z.string(), z.boolean()]), // Поддержка файлов и чекбоксов
        values: z.array(z.string()).optional(),
      })
      .superRefine((data, ctx) => {
        const { type, format, value } = data;
        const issue = {
          code: z.ZodIssueCode.custom,
          message: "",
          path: ["value"],
        };
        if (typeof value !== "string") {
          return;
        }
        if (type === "text" && !value.length) {
          issue.message = "Поле обязательное для заполнения";
        }

        if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          issue.message = "Неверный формат email";
        }

        if (type === "date" && !value) {
          issue.message = "Дата не может быть пустой";
        }
        if (type === "phone" && !isValidPhoneNumber(value, "RU")) {
          issue.message = "Неверный формат номера телефона";
        }

        if (format && value.length !== format.length) {
          issue.message = `Значение не соответствует формату: [${format}] `;
        }

        if (issue.message) {
          ctx.addIssue(issue);
        }
      })
  ),
});

export const applicationFormInitial = {
  files: [], // Пустой массив для файлов
  fields: [
    { field: "fio", type: "text", label: "ФИО", value: "", required: true },
    {
      field: "date_birth",
      type: "date",
      label: "Дата рождения",
      value: "",
      required: true,
    },
    {
      field: "e-mail",
      type: "email",
      label: "Электронная почта",
      value: "",
      required: true,
    },
    {
      field: "phone_number",
      type: "phone",
      label: "Номер телефона",
      value: "",
      required: true,
    },
    {
      field: "date_access",
      hidden: true,
      type: "date",
      label: "Дата обращения",
      value: new Date().toLocaleDateString(),
      required: true,
    },
    {
      field: "status",
      hidden: true,
      type: "select",
      label: "Статус",
      value: "Новый",
      values: ["Новый", "В обработке", "Действующий", "Закрытый"],
      required: true,
    },
    {
      field: "check_application",
      type: "download_file",
      label: "Заявление на вступление",
      filePath: "/Таблицы для базы данных.xlsx",
      value: false,
    },
    {
      field: "check_consent",
      type: "download_file",
      label: "Согласие на обработку персональных данных",
      filePath: "/Шишов Николай.pdf",
      value: false,
    },
  ],
};

export const educationFormInitial = {
  files: [], // Пустой массив для файлов
  fields: [
    { field: "fio", type: "text", label: "ФИО", value: "", required: true },
    {
      field: "date_birth",
      type: "date",
      label: "Дата рождения",
      value: "",
      required: true,
    },
    {
      field: "educational_institution",
      type: "text",
      label: "Учебное заведение",
      value: "",
      required: true,
    },
    {
      field: "faculty",
      type: "text",
      label: "Факультет",
      value: "",
      required: true,
    },
    {
      field: "specialty",
      type: "text",
      label: "Специальность",
      value: "",
      required: true,
    },
    {
      field: "form_study",
      type: "select",
      label: "Форма обучения",
      value: "Очная",
      values: ["Очная", "Заочная"],
      required: true,
    },
    {
      field: "date_admission",
      type: "date",
      label: "Дата поступления",
      value: "",
      required: true,
    },
    {
      field: "academic_leaves",
      type: "number",
      format: "X",
      label: "Количество академических отпусков",
      value: "",
      required: true,
    },
    {
      field: "course",
      type: "number",
      format: "X",
      label: "Курс",
      value: "",
      required: true,
    },
  ],
};

export const pasportFormInitial = {
  files: [], // Пустой массив для файлов
  fields: [
    { field: "fio", type: "text", label: "ФИО", value: "", required: true },
    {
      field: "date_birth",
      type: "date",
      label: "Дата рождения",
      value: "",
      required: true,
    },
    {
      field: "place_birth",
      type: "text",
      label: "Место рождения",
      value: "",
      required: true,
    },
    {
      field: "series",
      type: "number",
      label: "Серия",
      format: "XXXX",
      value: "",
      required: true,
    },
    {
      field: "number",
      type: "number",
      label: "Номер",
      format: "XXXXXX",
      value: "",
      required: true,
    },
    {
      field: "date_issue",
      type: "date",
      label: "Дата выдачи",
      value: "",
      required: true,
    },
    {
      field: "Issued_by",
      type: "text",
      label: "Кем выдан",
      value: "",
      required: true,
    },
    {
      field: "department_code",
      type: "number",
      label: "Код подразделения",
      format: "XXXXXX",
      value: "",
      required: true,
    },
    {
      field: "registration_address",
      type: "text",
      label: "Адрес регистрации",
      value: "",
      required: true,
    },
    {
      field: "address_index",
      type: "number",
      format: "XXXXXX",
      label: "Индекс адреса регистрации",
      value: "",
      required: true,
    },
  ],
};

export const workFormInitial = {
  files: [], // Пустой массив для файлов
  fields: [
    { field: "fio", type: "text", label: "ФИО", value: "", required: true },
    {
      field: "date_birth",
      type: "date",
      label: "Дата рождения",
      value: "",
      required: true,
    },
    {
      field: "place_birth",
      type: "text",
      label: "Место рождения",
      value: "",
      required: true,
    },
    {
      field: "INN",
      type: "number",
      label: "ИНН",
      format: "ХХХХХХХХХХХХ",
      value: "",
      required: true,
    },
    {
      field: "SNILS",
      type: "number",
      label: "СНИЛС",
      format: "XXXXXXXXXXX",
      value: "",
      required: true,
    },
    {
      field: "medical_policy",
      type: "number",
      label: "Полис ОМС",
      format: "ХХХХХХХХХХХХХХХХ",
      value: "",
      required: true,
    },
    {
      field: "gender",
      type: "select",
      label: "Пол",
      value: "Мужской",
      values: ["Мужской", "Женский"],
      required: true,
    },
    {
      field: "height",
      type: "number",
      label: "Рост",
      value: "",
      format: "XXX",
      required: true,
    },
    {
      field: "clothing_size",
      type: "text",
      label: "Размер одежды",
      value: "",
      required: true,
    },
    {
      field: "shoe_size",
      type: "number",
      label: "Размер обуви",
      value: "",
      format: "XX",
      required: true,
    },
  ],
};
