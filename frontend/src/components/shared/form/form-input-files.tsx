import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
}
export const FormInputFiles: React.FC<Props> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="files"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="h-12 text-md">Приложите файлы</FormLabel>
          <FormControl>
            <Input
              className="bg-white"
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                field.onChange(files);
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
