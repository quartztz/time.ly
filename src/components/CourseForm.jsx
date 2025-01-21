import {
  Form,
  FormField,
  FormItem,
  Input
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  zodResolver
} from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string(),
  color: z.string(),
  slots: z.array(
    z.object({
      day: z.string(),
      start: z.string().time(),
      end: z.string().time(),
    }),
  ),
});

const onSubmit = (data) => {
  console.log(data);
}

export const CourseForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Form>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <FormField>
          <FormItem label="Name">
            <Input {...form.register('name')} />
          </FormItem>
        </FormField>
      </form >
    </Form >
  );
}

