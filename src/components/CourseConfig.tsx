import type { Course } from "@/lib/Types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle
} from "@/components/ui/card";

interface why {
  color: string;
}

const Swatch = ({ color }: why) => {
  return <div style={{ backgroundColor: color, }} className="min-w-6 min-h-6 rounded p-2" />;
}

interface CourseConfigProps {
  courses: Course[];
}

const CourseConfig = ({ courses }: CourseConfigProps) => {
  const courseList = courses.map((course: Course) => (
    <Card key={course.name} className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div><CardTitle className="tracking-normal font-normal text-md">
          <p>{course.name}</p>
        </CardTitle>
          <CardDescription>{course.slots.length} timeslots.</CardDescription>
        </div>
        <Swatch color={course.color} />
      </div>
      <CardFooter className="w-full flex justify-end p-0 px-2">
        <Button variant="secondary" className="p-2">Edit</Button>
      </CardFooter>
    </Card>
  ));

  return (
    <>
      <CardHeader className="pt-2">
        <CardTitle>Courses</CardTitle>
        <CardDescription>Select a course, or create a new one.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 overflow-auto">
        {courseList}
      </CardContent>
    </>
  )
};

export default CourseConfig;