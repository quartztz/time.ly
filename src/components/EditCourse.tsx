import { courseSchema, type Course } from "@/lib/Types";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

interface EditCourseProps {
  course: Course;
  pushEdit: (newCourse: Course) => void;
}

interface CourseFormProps {
  course: Course;
  pushEdit: (newCourse: Course) => void;
  setOpen: (open: boolean) => void;
}

const CourseForm = ({ course, pushEdit, setOpen }: CourseFormProps) => {
  const form = useForm<Course>({
    resolver: zodResolver(courseSchema),
    defaultValues: course
  });
  const onsubmit = (val: Course) => {
    pushEdit(val);
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form className="w-full flex flex-col gap-2" onSubmit={form.handleSubmit(onsubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2">
              <div className="flex flex-col items-start justify-center gap-1">
                <FormLabel htmlFor={field.name}>Course Name</FormLabel>
                {
                  form.formState.errors.name ?
                    <FormMessage>{form.formState.errors.name?.message}</FormMessage> :
                    <FormDescription className="font-normal">Enter the course's name. Cannot be empty.</FormDescription>
                }
              </div>
              <FormControl {...field}>
                <input
                  id={field.name}
                  className="w-full rounded border border-slate-200 p-2"
                  {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2">
              <div className="flex flex-col items-start justify-center gap-1">
                <FormLabel htmlFor={field.name}>Course Code</FormLabel>
                {
                  form.formState.errors.code ?
                    <FormMessage>{form.formState.errors.code?.message}</FormMessage> :
                    <FormDescription className="font-normal">Course code, optional</FormDescription>
                }
              </div>
              <FormControl {...field}>
                <input
                  id={field.name}
                  className="w-full rounded border border-slate-200 p-2"
                  {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2">
              <div className="flex flex-col items-start justify-center gap-1">
                <FormLabel htmlFor={field.name}>Color</FormLabel>
                {
                  form.formState.errors.color ?
                    <FormMessage>{form.formState.errors.color?.message}</FormMessage> :
                    <FormDescription className="font-normal">The color of this course's timeslots.</FormDescription>
                }
              </div>
              <FormControl {...field}>
                <input
                  id={field.name}
                  className="w-full rounded border border-slate-200 p-2"
                  {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full flex pt-4 justify-between">
          <DialogClose asChild>
            <Button variant="destructive" className="w-fit">Cancel</Button>
          </DialogClose>
          <Button variant="default" type="submit" className="w-fit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

const EditCourseDialog = ({ course, pushEdit }: EditCourseProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="ghost" className="p-2">Edit Course</Button>
      </DialogTrigger>
      <DialogContent className="w-[50vw] max-w-[648px]">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>
            Edit course metadata, add and remove timeslots.
          </DialogDescription>
        </DialogHeader>
        <CourseForm course={course} pushEdit={pushEdit} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

export default EditCourseDialog; 