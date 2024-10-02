import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldType } from "./schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const groupFieldsByGroup = (
  fields: FieldType[]
): Record<string, FieldType[]> => {
  return fields.reduce((acc, field) => {
    if (!field.group) {
      acc[field.field] = [field];
      return acc;
    }
    if (!acc[field.group]) {
      acc[field.group] = [];
    }
    acc[field.group].push(field);
    return acc;
  }, {} as Record<string, FieldType[]>);
};

export const getDescriptionGroup = (fields: FieldType[]): string => {
  const findFieldDescription = fields.find((o) => o.description);
  if (findFieldDescription) {
    return findFieldDescription.description || "";
  }
  return "";
};

export const prepareInitialFormData = ({ fields, storeData }) => {
  return fields.map((o) => {
    if (!storeData?.first_name) {
      return o;
    }
    switch (o.field) {
      case "fio":
        o.value = `${storeData.last_name} ${storeData.first_name} ${storeData.patronymic}`;
        break;
      case "phone_number":
        o.value = storeData.phone_number || "";
        break;
      case "date_birth":
        o.value = storeData.date_birth || "";
        break;
      case "email":
        o.value = storeData.email || "";
        break;
      default:
        break;
    }
    return o;
  });
};
