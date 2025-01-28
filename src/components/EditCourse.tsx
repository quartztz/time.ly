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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { daysOfWeek } from "@/lib/Common";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import DeleteIcon from "./icons/DeleteIcon";

interface EditCourseProps {
  course: Course;
  pushEdit: (newCourse: Course) => void;
}

interface CourseFormProps {
  course: Course;
  pushEdit: (newCourse: Course) => void;
}

const CourseForm = ({ course, pushEdit }: CourseFormProps) => {
  const form = useForm<Course>({
    resolver: zodResolver(courseSchema),
    defaultValues: course
  });

  const onsubmit = (val: Course) => {
    pushEdit(val);
  };

  const addNewSlot = () => {
    const updatedSlots = [...form.getValues("slots"), {
      day: 0,
      startTime: 0,
      duration: 0,
      kind: "",
      conflicts: 0
    }];
    form.setValue("slots", updatedSlots);
  };

  const deleteSlot = (index: number) => {
    const updatedSlots = form.getValues("slots").filter((_, i) => i !== index);
    form.setValue("slots", updatedSlots);
  };

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

        <Table>
          <TableCaption>Timeslots</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Kind</TableHead>
              <TableHead>Conflicts</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              form.watch("slots").map((slot, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`slots.${idx}.day`}
                      render={({ field }) => (
                        <Select
                          {...field}
                          defaultValue={daysOfWeek[slot.day]}
                          value={daysOfWeek[slot.day]}
                          onValueChange={(value) => {
                            const newDay = daysOfWeek.indexOf(value);
                            field.onChange(newDay);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={daysOfWeek[slot.day]} />
                          </SelectTrigger>
                          <SelectContent>
                            {
                              daysOfWeek.map((day) => (
                                <SelectItem key={day} value={day}>{day}</SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`slots.${idx}.startTime`}
                      render={({ field }) => (
                        <FormControl>
                          <input
                            type="number"
                            className="w-full rounded border border-slate-200 p-2"
                            {...field}
                          />
                        </FormControl>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`slots.${idx}.duration`}
                      render={({ field }) => (
                        <FormControl>
                          <input
                            type="number"
                            className="w-full rounded border border-slate-200 p-2"
                            {...field}
                          />
                        </FormControl>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`slots.${idx}.kind`}
                      render={({ field }) => (
                        <FormControl>
                          <input
                            className="w-full rounded border border-slate-200 p-2"
                            {...field}
                          />
                        </FormControl>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`slots.${idx}.conflicts`}
                      render={({ field }) => (
                        <FormControl>
                          <input
                            type="number"
                            className="w-full rounded border border-slate-200 p-2"
                            {...field}
                          />
                        </FormControl>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      className="w-8 h-8"
                      onClick={() => deleteSlot(idx)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
            <TableRow>
              <TableCell colSpan={6} className="p-0 flex items-end">
                <Button variant="ghost" className="p-2" onClick={addNewSlot}>
                  + add new timeslot
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="w-full flex pt-4 justify-end">
          <Button variant="default" type="submit" className="w-fit">Save</Button>
        </div>
      </form>
    </Form >
  );
}

const EditCourseDialog = ({ course, pushEdit }: EditCourseProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2">Edit Course</Button>
      </DialogTrigger>
      <DialogContent className="w-[50vw] max-w-[648px]">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>
            Edit course metadata, add and remove timeslots.
          </DialogDescription>
        </DialogHeader>
        <CourseForm course={course} pushEdit={pushEdit} />
      </DialogContent>
    </Dialog>
  )
}

export default EditCourseDialog;