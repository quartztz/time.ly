// import {
//   Form,
//   FormField,
//   FormItem,
//   Input
// } from "@/components/ui/form";
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

export const CourseForm = () => {

}

