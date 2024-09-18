import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/form";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormInputFiles } from "@/components/shared/form/form-input-files";

// Схема валидации с использованием superRefine
const validationSchema = z.object({
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

const formInitial = {
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
      required: false,
    },
    {
      field: "check_consent",
      type: "checkbox",
      label: "Согласие на обработку персональных данных",
      value: false,
      required: false,
    },
    {
      field: "check_сertificate_study",
      type: "checkbox",
      label: "Сертификат об обучении",
      value: false,
      required: false,
    },
  ],
};

export default function ApplicationForm() {
  const methods = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: formInitial,
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = methods;

  const { fields } = useFieldArray({
    name: "fields", // Исправляем имя
    control,
  });

  const onSubmit = (data: {
    files: File[];
    fields: { field: string; value: string }[];
  }) => {
    console.log(data.fields);
    console.log(data.files); // Обрабатываем файлы
  };

  return (
    <div className="w-full flex justify-center">
      {/* Оборачиваем всю форму в FormProvider */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-bold mb-4">Заявка на вступление</h2>
          {fields.map((field, index) => (
            <FormInput
              key={field.field}
              label={field.label}
              name={`fields.${index}.value`} // Исправляем имя
              type={field.type}
              setValue={setValue}
              control={control}
              required={field.required}
              errorText={errors?.fields?.[index]?.value?.message as string} // Исправляем доступ к ошибкам
            />
          ))}
          <FormInputFiles control={control} />
          <Button type="submit">Отправить заявку</Button>
        </form>
      </FormProvider>
    </div>
  );
}
