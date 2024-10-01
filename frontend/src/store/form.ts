// store.ts
import { create } from "zustand";

interface FormState {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
}

export const useFormStore = create<FormState>((set) => ({
  formData: {},
  setFormData: (data) => set({ formData: data }),
}));
