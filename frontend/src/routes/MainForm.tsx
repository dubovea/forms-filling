import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/form";
import { Container } from "@/components/shared/container";
import { applicationFormInitial, applicationFormSchema } from "@/lib/schema";
import toast from "react-hot-toast";
import { sendMail } from "@/lib/mail";
import { Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn, getDescriptionGroup, groupFieldsByGroup } from "@/lib/utils";
import { MainLabel } from "@/components/shared/main-label";
import { useFormStore } from "@/store";
import { FormInputFiles } from "@/components/shared/form/form-input-files";

export default function MainForm() {
  const navigate = useNavigate();
  const formData = useFormStore((state) => state.formData);

  applicationFormInitial.fields = applicationFormInitial.fields.map((o) => {
    if (!formData?.first_name) {
      return o;
    }
    switch (o.field) {
      case "fio":
        o.value = `${formData.last_name} ${formData.first_name} ${formData.patronymic}`;
        break;
      case "phone_number":
        o.value = formData.phone_number || "";
        break;
      case "date_birth":
        o.value = formData.date_birth || "";
        break;
      case "email":
        o.value = formData.email || "";
        break;
      default:
        break;
    }
    return o;
  });
  const methods = useForm({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: applicationFormInitial,
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

  const groupedFields = groupFieldsByGroup(fields);
  const onSubmit = async (data: typeof applicationFormInitial) => {
    const response = await sendMail({
      data,
      title: "Вступление в Студеческие отряды Югры",
    });
    toast.success(response);
    navigate("/forms");
  };

  return (
    <Container>
      <MainLabel
        children={
          <Link to="/forms" className="text-black">
            <Home />
          </Link>
        }
      />
      <div className="mb-2">
        В данном разделе можно заполнить всю необходимую информацию и прикрепить
        соответствующие файлы для передачи в штаб регионального отделения.
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {Object.entries(groupedFields).map(([group, groupFields]) => (
            <div key={group}>
              {getDescriptionGroup(groupFields) && (
                <div className="mb-2 font-semibold">
                  {getDescriptionGroup(groupFields)}
                </div>
              )}
              <div className="flex flex-wrap mb-4">
                {groupFields.map((field) => (
                  <div className="flex-1 min-w-[150px] mr-2" key={field.field}>
                    <FormInput
                      className={cn(field.hidden && "hidden")}
                      label={field.label}
                      name={`fields.${field.index}.value`}
                      values={field.values}
                      type={field.type}
                      setValue={setValue}
                      control={control}
                      required={field.required}
                      errorText={
                        errors?.fields?.[field.index]?.value?.message as string
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <FormInputFiles control={control} />
          <Button
            className="mt-4 w-full text-lg h-12"
            type="submit"
            size={"lg"}
          >
            Продолжить
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
}
