import { useForm, UseFormProps, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/form";

const validationSchema = z.object({
  posts: z.array(
    z.object({
      field: z.string(),
      label: z.string(),
      value: z.string().min(3, { message: "Минимум 3 символа для поля ФИО" }),
    })
  ),
});

type Post = z.infer<typeof validationSchema>["posts"][number];

const postsInitial: Post[] = [
  { field: "fio", label: "ФИО", value: "" },
  { field: "date", label: "Дата рождения", value: "" },
];

function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });

  return form;
}

export default function ApplicationForm() {
  const [posts, setPosts] = useState<Post[]>(() => postsInitial);

  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useZodForm({
    schema: validationSchema,
    defaultValues: { posts },
    mode: "onChange",
  });

  const { fields } = useFieldArray({
    name: "posts",
    control,
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("Data submitted:", data);
        setPosts(data.posts);
      })}
    >
      <h2 className="text-xl font-bold">Change the data</h2>

      {fields.map((field, index) => {
        return (
          <FormInput
            label={field.label}
            name={`posts.${index}.value`}
            watch={watch}
            register={register}
            setValue={setValue}
            errorText={errors?.posts?.[index]?.value?.message as string}
          />
        );
      })}

      <Button type="submit">Submit</Button>
    </form>
  );
}
