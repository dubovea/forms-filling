import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import {
  applicationFormInitial,
  applicationFormSchema,
  FormValuesType,
} from "@/lib/schema";
import toast from "react-hot-toast";
import { sendMail } from "@/lib/mail";
import { Undo } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { prepareInitialFormData } from "@/lib/utils";
import { MainLabel } from "@/components/shared/main-label";
import { useFormStore } from "@/store";
import { FormInputFiles } from "@/components/shared/form/form-input-files";
import { FormLayout } from "@/components/shared/form/form-layout";
import { useNavBack } from "@/hooks/useNavBack";

export default function MainForm() {
  useNavBack();
  const navigate = useNavigate();
  const storeData = useFormStore((state) => state.formData);

  applicationFormInitial.fields = prepareInitialFormData({
    fields: applicationFormInitial.fields,
    storeData,
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

  const onSubmit = async (data: FormValuesType) => {
    const response = await sendMail({
      formData: data,
      storeData,
      title: "Заявка на вступление вСтудеческие отряды Югры",
    });
    if (response.valid) {
      toast.success(response.message);
      navigate("/forms");
      return;
    }
    toast.error(response.message);
  };

  return (
    <Container>
      <MainLabel
        children={
          <Link to="/forms" className="text-black">
            <Undo />
          </Link>
        }
      />
      <div className="mb-2">
        В данном разделе можно заполнить всю необходимую информацию и прикрепить
        соответствующие файлы для передачи в штаб регионального отделения.
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLayout
            fields={fields}
            setValue={setValue}
            control={control}
            errors={errors}
          />
          <FormInputFiles control={control} />
          <div className="flex flex-row gap-4">
            <Button
              className="mt-4 w-full text-lg h-12"
              type="submit"
              size={"lg"}
            >
              Отправить
            </Button>
            <Button
              onClick={() => navigate("/forms")}
              variant="outline"
              className="mt-4 w-full text-lg h-12"
              size={"lg"}
            >
              Назад
            </Button>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
