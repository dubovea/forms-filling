import { Container } from "@/components/shared/container";
import {
  useForm,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  applicationFormSchema,
  FormValuesType,
  welcomeFormInitial,
} from "@/lib/schema";
import { useFormStore } from "@/store/form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ModalPersonalData } from "@/components/shared/modal-personal-data";
import { useNavigate } from "react-router-dom";
import { MainLabel } from "@/components/shared/main-label";
import { FormLayout } from "@/components/shared/form/form-layout";

export default function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const methods = useForm({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: welcomeFormInitial,
    mode: "onChange",
  });
  const setFormData = useFormStore((state) => state.setFormData);

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = methods;

  const { fields } = useFieldArray({
    name: "fields", // Исправляем имя
    control,
  });

  // Функция отправки данных
  const onSubmit = (data: FormValuesType) => {
    // Сохраняем данные в Zustand при успешной валидации
    if (isValid) {
      const oFields = data.fields.reduce((acc, val) => {
        acc[val.field] = val.value;
        return acc;
      }, {} as Record<string, string | boolean>);
      setFormData(oFields);
      navigate("/forms");
    }
  };

  const findCheckBoxPersonal = fields.findIndex(
    (field) => field.field === "personal_data"
  );

  const checkbox = watch(`fields.${findCheckBoxPersonal}`);
  const handleDeclinePersonalData = () => {
    setValue(`fields.${findCheckBoxPersonal}.value`, false, {
      shouldValidate: true,
    });
    setModalOpen(false);
  };
  const handleAgreePersonalData = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (checkbox.value) {
      setModalOpen(true);
    }
  }, [checkbox.value]);
  return (
    <Container>
      <MainLabel />
      <div className="mb-2">
        Рады приветствовать в нашем приложение, которое поможет выстроить
        простой и быстрый способ взаимодействия между нами.
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLayout
            fields={fields}
            setValue={setValue}
            control={control}
            errors={errors}
          />
          <Button
            className="mt-4 w-full text-lg h-12"
            type="submit"
            size={"lg"}
          >
            Продолжить
          </Button>
        </form>
      </FormProvider>
      <ModalPersonalData
        isOpen={isModalOpen}
        onClose={handleDeclinePersonalData}
        onSubmit={handleAgreePersonalData}
      />
    </Container>
  );
}
