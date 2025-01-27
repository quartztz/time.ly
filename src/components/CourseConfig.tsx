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
import { useRef } from "react";

interface why {
  color: string;
}

const Swatch = ({ color }: why) => {
  return <div style={{ backgroundColor: color, }} className="min-w-6 min-h-6 rounded p-2" />;
}

interface CourseConfigProps {
  courses: Course[];
  onCourseChange?: (courses: Course[]) => void;
}

const CourseConfig = ({ courses, onCourseChange }: CourseConfigProps) => {

  const fileInput = useRef<HTMLInputElement>(null);
  const handleFileInput = () => {
    console.log("file input clicked");
    console.log(fileInput.current);
    fileInput.current?.click();
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length == 0) {
      return;
    }
    const file = e.target.files[0];
    file.text().then(t => JSON.parse(t)).then((data: Course[]) => {
      if (onCourseChange) {
        onCourseChange(data);
      }
    });
  }

  const exportCourses = () => {
    const data = JSON.stringify(courses);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "courses.json";
    a.click();
    URL.revokeObjectURL(url);
  }

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
      <CardHeader className="pt-2 pb-2">
        <CardTitle>Courses</CardTitle>
        <CardDescription>Select a course, or create a new one.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 overflow-auto">
        <Button className="w-full">New Course</Button>
        <div className="w-full flex gap-2">
          <Button variant="destructive" className="w-full p-2" onClick={() => onCourseChange && onCourseChange([])}>
            Clear
          </Button>
          <Button variant="ghost" className="w-full p-2" onClick={exportCourses}>
            Export
          </Button>
          <Button variant="ghost" className="w-full p-2" onClick={handleFileInput}>
            <input
              ref={fileInput}
              type="file"
              accept="*.json"
              className="hidden"
              onChange={handleFileChange}
            />
            Import
          </Button>
        </div>
        {courseList}
      </CardContent>
    </>
  )
};

export default CourseConfig;