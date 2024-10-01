import { group } from "console";
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
        required: z.boolean().optional(),
        type: z.string(),
        label: z.string(),
        description: z.string().optional(),
        format: z.string().optional(),
        filePath: z.string().optional(),
        value: z.union([z.string(), z.boolean()]), // Поддержка файлов и чекбоксов
        values: z.array(z.string()).optional(),
      })
      .superRefine((data, ctx) => {
        const { type, format, value, required } = data;
        const issue = {
          code: z.ZodIssueCode.custom,
          message: "",
          path: ["value"],
        };
        if (!required && !value) {
          return;
        }

        const isText = typeof value === "string";
        if (type === "checkbox" && !value && required && format) {
          issue.message = format;
        }
        if (isText && type === "text" && !value) {
          issue.message = "Поле обязательное для заполнения";
        }

        if (
          isText &&
          type === "email" &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
          issue.message = "Неверный формат email";
        }

        if (isText && type === "date" && !value) {
          issue.message = "Дата не может быть пустой";
        }
        if (isText && type === "phone" && !isValidPhoneNumber(value, "RU")) {
          issue.message = "Неверный формат номера телефона";
        }

        if (isText && format && value.length !== format.length) {
          issue.message = `Значение не соответствует формату: [${format}] `;
        }

        if (issue.message) {
          ctx.addIssue(issue);
        }
      })
  ),
});

export const welcomeFormInitial = {
  files: [], // Пустой массив для файлов
  fields: [
    {
      field: "last_name",
      type: "text",
      label: "Фамилия",
      description: "Расскажи о себе:",
      value: "",
      group: "group1",
      index: 0,
      required: true,
    },
    {
      field: "first_name",
      type: "text",
      label: "Имя",
      value: "",
      group: "group1",
      index: 1,
      required: true,
    },
    {
      field: "patronymic",
      type: "text",
      label: "Отчество",
      value: "",
      group: "group2",
      index: 2,
      required: true,
    },
    {
      field: "date_birth",
      type: "date",
      label: "Дата рождения",
      value: "",
      group: "group2",
      index: 3,
      required: true,
    },
    {
      field: "phone_number",
      type: "phone",
      label: "Номер телефона",
      description: "Как нам с тобой связаться:",
      value: "",
      index: 4,
    },
    {
      field: "email",
      type: "email",
      label: "Электронная почта",
      value: "",
      index: 5,
    },
    {
      field: "personal_data",
      type: "checkbox",
      label:
        "Нажимая кнопку «Продолжить», я даю свое согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ «О персональных данных», на условиях и для целей, определенных в Согласии на обработку персональных данных.",
      format: "Необходимо подтвердить обработку персональных данных",
      value: false,
      index: 6,
      required: true,
    },
  ],
};

export const applicationFormInitial = {
  files: [], // Пустой массив для файлов
  fields: [
    {
      field: "fio",
      type: "text",
      label: "ФИО",
      value: "",
      index: 0,
      description: "Общие сведения",
      required: true,
    },
    {
      field: "phone_number",
      type: "phone",
      label: "Номер телефона",
      value: "",
      index: 1,
      required: true,
    },
    {
      field: "email",
      type: "email",
      label: "Электронная почта",
      value: "",
      index: 2,
      required: true,
    },
    {
      field: "social_networks",
      type: "text",
      label: "Страницы в соцсетях",
      index: 3,
      value: "",
    },
    {
      field: "educational_institution",
      type: "text",
      label: "Наименование образовательной организации",
      description: "Информация об образовательной организации",
      value: "",
      index: 4,
    },
    {
      field: "faculty",
      type: "text",
      label: "Факультет",
      value: "",
      index: 5,
    },
    {
      field: "specialty",
      type: "text",
      label: "Специальность",
      value: "",
      index: 6,
    },
    {
      field: "date_admission",
      type: "date",
      label: "Дата поступления",
      group: "group1",
      value: "",
      index: 7,
    },
    {
      field: "date_end",
      type: "date",
      label: "Дата окончания",
      group: "group1",
      value: "",
      index: 8,
    },
    {
      field: "form_study",
      type: "select",
      label: "Форма обучения",
      group: "group2",
      value: "Очная",
      index: 9,
      values: ["Очная", "Заочная"],
    },
    {
      field: "course",
      type: "number",
      format: "X",
      label: "Курс",
      group: "group2",
      value: "",
      index: 10,
    },
    {
      field: "date_birth",
      type: "date",
      label: "Дата рождения",
      group: "group3",
      description: "Паспортные данные",
      value: "",
      index: 11,
    },
    {
      field: "age",
      type: "number",
      label: "Возраст",
      group: "group3",
      value: "",
      format: "XX",
      index: 12,
    },
    {
      field: "series",
      type: "number",
      label: "Серия",
      group: "group4",
      format: "XXXX",
      value: "",
      index: 13,
    },
    {
      field: "number",
      type: "number",
      label: "Номер",
      group: "group4",
      format: "XXXXXX",
      value: "",
      index: 14,
    },
    {
      field: "Issued_by",
      type: "text",
      label: "Кем выдан",
      value: "",
      index: 15,
    },
    {
      field: "date_issue",
      type: "date",
      label: "Дата выдачи",
      group: "group5",
      value: "",
      index: 16,
    },

    {
      field: "department_code",
      type: "number",
      label: "Код подразделения",
      group: "group5",
      format: "XXXXXX",
      value: "",
      index: 17,
    },
    {
      field: "registration_address",
      type: "text",
      label: "Адрес регистрации",
      value: "",
      index: 18,
    },
    {
      field: "address_index",
      type: "number",
      format: "XXXXXX",
      label: "Индекс адреса регистрации",
      value: "",
      index: 19,
    },
    {
      field: "residence_address",
      type: "text",
      label: "Адрес проживания",
      value: "",
      index: 20,
    },
    {
      field: "INN",
      type: "number",
      label: "ИНН",
      description: "Для участия в трудовых проектах",
      format: "ХХХХХХХХХХХХ",
      value: "",
      index: 21,
    },
    {
      field: "SNILS",
      type: "number",
      label: "СНИЛС",
      format: "XXXXXXXXXXX",
      value: "",
      index: 22,
    },
    {
      field: "medical_policy",
      type: "number",
      label: "Полис ОМС",
      format: "ХХХХХХХХХХХХХХХХ",
      value: "",
      index: 23,
    },
    {
      field: "gender",
      type: "select",
      label: "Пол",
      value: "Мужской",
      values: ["Мужской", "Женский"],
      index: 24,
    },
    {
      field: "height",
      type: "number",
      label: "Рост",
      value: "",
      format: "XXX",
      group: "group6",
      index: 25,
    },
    {
      field: "clothing_size",
      type: "text",
      label: "Размер одежды",
      group: "group6",
      value: "",
      index: 26,
    },
    {
      field: "shoe_size",
      type: "number",
      label: "Размер обуви",
      group: "group6",
      value: "",
      format: "XX",
      index: 27,
    },
  ],
};

export const documents = [
  {
    label: "Таблицы для базы данных",
    filePath: "/Таблицы для базы данных.xlsx",
  },
  { label: "Шишов Николай", filePath: "/Шишов Николай.pdf" },
];
