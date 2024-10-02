import { cn, getDescriptionGroup, groupFieldsByGroup } from "@/lib/utils";
import { FormInput } from "./form-input";

export const FormLayout = ({ fields, setValue, control, errors }) => {
  const groupedFields = groupFieldsByGroup(fields);
  return Object.entries(groupedFields).map(([group, groupFields]) => (
    <div key={group}>
      {getDescriptionGroup(groupFields) && (
        <div className="mb-2 font-semibold">
          {getDescriptionGroup(groupFields)}
        </div>
      )}
      <div className="flex flex-wrap mb-4">
        {groupFields.map((field) => {
          const formIndex = fields.findIndex((f: { field: string; }) => f.field === field.field);
          return (
            <div className="flex-1 min-w-[150px] mr-2" key={field.field}>
              <FormInput
                className={cn(field.hidden && "hidden")}
                label={field.label}
                name={`fields.${formIndex}.value`}
                values={field.values}
                type={field.type}
                setValue={setValue}
                control={control}
                required={field.required}
                disabled={field.disabled}
                errorText={
                  errors?.fields?.[formIndex]?.value?.message as string
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  ));
};
