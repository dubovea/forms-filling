import { Input } from "../../ui/input";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";
import { ClearButton } from "../clear-button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { isDate } from "date-fns";
import { FormCalendar } from "./form-calendar";
import { PhoneInput } from "@/components/ui/phone-input";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

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
  const isTextField =
    type === "text" || type === "email" || isStatusField || !type;
  const isDateField = type === "date";
  const isPhoneField = type === "phone";
  const isCheckBoxField = type === "checkbox";
  const isFileField = type === "file";

  return (
    <div className={className}>
      {label && !isCheckBoxField && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      {label && isCheckBoxField && (
        <div className="flex items-center gap-2 justify-between">
          <p className="font-medium mb-2">
            {label} {required && <RequiredSymbol />}
          </p>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      )}
      <div className="relative">
        {isTextField && (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Input
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
        {isPhoneField && (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <PhoneInput
                className="h-12 text-md"
                defaultCountry="RU"
                countries={["RU"]}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        )}
        

        {isTextField && (
          <ClearButton disabled={isStatusField} onClick={onClickClear} />
        )}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
