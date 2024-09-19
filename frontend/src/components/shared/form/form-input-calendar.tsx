import React from "react";
import { Controller } from "react-hook-form";
import { Calendar } from "../calendar";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
}
export const FormInputCalendar: React.FC<Props> = ({ control, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Calendar field={field} />}
    />
  );
};
