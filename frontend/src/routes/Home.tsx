import { Container } from "@/components/shared/container";
import {
  useForm,
  useFieldArray,
  FormProvider,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/shared/form";
import { applicationFormSchema, welcomeFormInitial } from "@/lib/schema";
import { cn, getDescriptionGroup, groupFieldsByGroup } from "@/lib/utils";
import { useFormStore } from "@/store/form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ModalPersonalData } from "@/components/shared/modal-personal-data";
import { useNavigate } from "react-router-dom";
import { MainLabel } from "@/components/shared/main-label";

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

  const groupedFields = groupFieldsByGroup(fields);
  // Функция отправки данных
  const onSubmit = (data: FieldValues) => {
    // Сохраняем данные в Zustand при успешной валидации
    if (isValid) {
      const oFields = data.fields.reduce((acc, val) => {
        acc[val.field] = val.value;
        return acc;
      }, {});
      setFormData(oFields);
      navigate("/forms");
    }
  };

  const findCheckBoxPersonal = fields.findIndex(
    (field) => field.field === "personal_data"
  );

  const checkbox = watch(`fields.${findCheckBoxPersonal}`);
  const handleDeclinePersonalData = () => {
    setValue(`fields.${findCheckBoxPersonal}.value`, false);
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
