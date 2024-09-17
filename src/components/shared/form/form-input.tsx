"use client";
import { Input } from "../../ui/input";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";
import { ClearButton } from "../clear-button";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorText: any;
  setValue: any;
  register: any;
  watch: any;
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  errorText,
  setValue,
  register,
  watch,
  className,
  name,
  label,
  required,
  ...props
}) => {
  const value = watch(name);
  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear} className="w-5 h-5 mb-2"/>}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
