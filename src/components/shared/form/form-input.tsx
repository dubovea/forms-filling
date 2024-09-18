import { Input } from "../../ui/input";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";
import { ClearButton } from "../clear-button";
import { FormCalendar } from "./form-calendar";
import { Controller } from "react-hook-form";
import { FormInputCheckbox } from "./form-input-checkbox";
import { FormInputPhone } from "./form-input-phone";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  errorText: any;
  setValue: any;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  control,
  name,
  label,
  type,
  required,
  className,
  errorText,
  setValue,
  ...props
}) => {
  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true }); // очищаем значение
  };

  const isStatusField = type === "status";
  const isNumberField = type === "number";
  const isTextField =
    type === "text" ||
    isNumberField ||
    type === "email" ||
    isStatusField ||
    !type;
  const isDateField = type === "date";
  const isPhoneField = type === "phone";
  const isCheckBoxField = type === "checkbox";

  return (
    <div className={className}>
      {label && !isCheckBoxField && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      {label && isCheckBoxField && (
        <FormInputCheckbox control={control} name={name} label={label} />
      )}
      <div className="relative">
        {isTextField && (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Input
                type={isNumberField ? "number" : "text"}
                disabled={isStatusField}
                className="h-12 text-md"
                {...field}
                {...props}
              />
            )}
          />
        )}
        {isDateField && (
          <Controller
            name={name}
            control={control}
            render={({ field }) => <FormCalendar field={field} />}
          />
        )}
        {isPhoneField && <FormInputPhone control={control} name={name} />}

        {isTextField && (
          <ClearButton disabled={isStatusField} onClick={onClickClear} />
        )}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
