import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

// Схема валидации с использованием superRefine
export const applicationFormSchema = z.object({
  files: z.array(z.instanceof(File)).optional(), // Используйте массив файлов
  fields: z.array(
    z
      .object({
        field: z.string(),
        type: z.string(),
        label: z.string(),
        value: z.union([z.string(), z.boolean()]), // Поддержка файлов и чекбоксов
      })
      .superRefine((data, ctx) => {
        const { type, value } = data;
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
      type: "date",
      label: "Дата обращения",
      value: "",
      required: true,
    },
    {
      field: "status",
      type: "status",
      label: "Статус",
      value: "Новый",
      required: true,
    },
    {
      field: "check_application",
      type: "checkbox",
      label: "Заявление на вступление",
      value: false,
      required: true,
    },
    {
      field: "check_consent",
      type: "checkbox",
      label: "Согласие на обработку персональных данных",
      value: false,
      required: true,
    },
    {
      field: "check_сertificate_study",
      type: "checkbox",
      label: "Сертификат об обучении",
      value: false,
      required: true,
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
      type: "text",
      label: "Форма обучения",
      value: "",
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
      label: "Количество академических отпусков",
      value: "",
      required: true,
    },
    {
      field: "course",
      type: "number",
      label: "Курс",
      value: "",
      required: true,
    },
  ],
};
