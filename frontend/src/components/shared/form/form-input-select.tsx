import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Controller } from "react-hook-form";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  values?: string[];
  control: any;
}
export const FormInputSelect: React.FC<Props> = ({ control, name, values }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {values?.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};
