import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/form";
import { FormInputFiles } from "@/components/shared/form/form-input-files";
import { Container } from "@/components/shared/container";
import { applicationFormSchema, pasportFormInitial } from "@/lib/schema";
import toast from "react-hot-toast";
import { sendMail } from "@/lib/mail";
import { Link, useNavigate } from "react-router-dom";
import { Undo } from "lucide-react";

export default function PasportForm() {
  const navigate = useNavigate();
  
  const methods = useForm({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: pasportFormInitial,
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

  const onSubmit = async (data: typeof pasportFormInitial) => {
    const response = await sendMail({
      data,
      title: "Паспортные данные",
    });
    toast.success(response);
    navigate("/");
  };

  return (
    <Container className="mt-4 p-4">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row">
            <Link to="/" className="text-white">
              <Undo />
            </Link>
            <h2 className="text-xl font-bold mb-4 ml-2">Паспортные данные</h2>
          </div>
          {fields.map((field, index) => (
            <FormInput
              className="mb-4"
              key={field.field}
              label={field.label}
              name={`fields.${index}.value`}
              values={field.values}
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
