import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";
import { ClearButton } from "../clear-button";
import { FormInputCheckbox } from "./form-input-checkbox";
import { FormInputPhone } from "./form-input-phone";
import { FormInputSelect } from "./form-input-select";
import { FormInputCalendar } from "./form-input-calendar";
import { FormInputBase } from "./form-input-base";
import { FormInputDownload } from "./form-input-download";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  values?: string[];
  label?: string;
  type?: string;
  required?: boolean;
  errorText: any;
  setValue: any;
  className?: string;
  filePath?: string;
}

export const FormInput: React.FC<Props> = ({
  control,
  name,
  values,
  label,
  type,
  required,
  className,
  errorText,
  setValue,
  filePath,
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
  const isSelectField = type === "select";
  const isDownloadField = type === "download_file";
  return (
    <div className={className}>
      {label && !isCheckBoxField && !isDownloadField && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      {label && isCheckBoxField && (
        <FormInputCheckbox control={control} name={name} label={label} />
      )}
      <div className="relative">
        {isTextField && (
          <FormInputBase control={control} name={name} type={type} />
        )}
        {isDateField && <FormInputCalendar control={control} name={name} />}
        {isPhoneField && <FormInputPhone control={control} name={name} />}
        {isSelectField && (
          <FormInputSelect control={control} name={name} values={values} />
        )}

        {isDownloadField && (
          <FormInputDownload label={label} filePath={filePath} />
        )}

        {isTextField && (
          <ClearButton disabled={isStatusField} onClick={onClickClear} />
        )}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
