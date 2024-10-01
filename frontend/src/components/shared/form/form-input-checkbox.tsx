import React from "react";
import { RequiredSymbol } from "../required-symbol";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  name: string;
  control: any;
}
export const FormInputCheckbox: React.FC<Props> = ({
  control,
  name,
  label,
  required,
}) => {
  return (
    <div className="flex items-center gap-4 justify-between">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        )}
      />
      <p className="mb-2">
        {label} {required && <RequiredSymbol />}
      </p>
    </div>
  );
};
