import React from "react";
import { Controller } from "react-hook-form";
import { PhoneInput } from "@/components/ui/phone-input";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  disabled?: boolean;
}
export const FormInputPhone: React.FC<Props> = ({
  control,
  name,
  disabled,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <PhoneInput
          disabled={disabled}
          className="bg-white h-12"
          defaultCountry="RU"
          countries={["RU"]}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
};
