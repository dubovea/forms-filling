import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface Field {
  values: string[] | undefined;
  description: string;
  index: number;
  field: string;
  label: string;
  type: string;
  required: boolean;
  hidden?: boolean;
  group: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const groupFieldsByGroup = (
  fields: Field[]
): Record<string, Field[]> => {
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
  }, {} as Record<string, Field[]>);
};

export const getDescriptionGroup = (fields: Field[]): string => {
  const findFieldDescription = fields.find((o) => o.description);
  if (findFieldDescription) {
    return findFieldDescription.description;
  }
  return "";
};
