import { z } from "zod";

export const formSchema = z.object({
  fio: z.string().min(3, {
    message: "ФИО минимум должно содержать минимум 3 символа.",
  }),
});
