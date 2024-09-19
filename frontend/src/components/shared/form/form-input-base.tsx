import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  type?: string;
}
export const FormInputBase: React.FC<Props> = ({ control, name, type }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          type={type === "number" ? "number" : "text"}
          className="h-12 text-md bg-white"
          {...field}
        />
      )}
    />
  );
};
