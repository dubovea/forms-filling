import React from "react";
import { Controller } from "react-hook-form";
import { PhoneInput } from "@/components/ui/phone-input";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
}
export const FormInputPhone: React.FC<Props> = ({ control, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <PhoneInput
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
