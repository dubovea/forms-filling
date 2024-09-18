import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/form";
import { FormInputFiles } from "@/components/shared/form/form-input-files";
import { Container } from "@/components/shared/container";
import { applicationFormSchema, educationFormInitial } from "@/lib/schema";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

export default function EducationForm() {
  const methods = useForm({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: educationFormInitial,
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

  const onSubmit = (data: typeof educationFormInitial) => {
    const sMessage = Object.values(data.fields).reduce((acc, val) => {
      acc += `${val.label}: ${val.value}\n`;
      return acc;
    }, "");
    const contactdetail = {
      title: "Информация об образовательной организации",
      from_name: "Эдик",
      to_name: "Тимур",
      reply_to: "shadowfiendyaphetz@gmail.com",
      message: sMessage,
    };
    emailjs
      .send(
        "service_98rg1t9", // ID сервиса из панели управления EmailJS
        "template_n85bdbw", // ID шаблона из панели управления EmailJS
        contactdetail, // Форма для отправки
        "kPvESNPnevt2e7XH0" // Пользовательский ID из EmailJS
      )
      .then(
        () => {
          toast.success("Заявка отправлена!");
        },
        (error) => {
          toast.error(error.text);
        }
      );
  };

  return (
    <Container className="mt-4 p-4">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-bold mb-4">
            Информация об образовательной организации
          </h2>
          {fields.map((field, index) => (
            <FormInput
              className="mb-4"
              key={field.field}
              label={field.label}
              name={`fields.${index}.value`}
              type={field.type}
              setValue={setValue}
              control={control}
              required={field.required}
              errorText={errors?.fields?.[index]?.value?.message as string}
            />
          ))}
          <FormInputFiles control={control} />
          <Button
            className="mt-4 w-full text-lg h-12"
            type="submit"
            variant="secondary"
            size={"lg"}
          >
            Отправить заявку
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
}
