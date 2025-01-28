import { useRef } from "react";
import type { Course } from "@/lib/Types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle
} from "@/components/ui/card";
import CourseDialog from "./EditCourse";

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
  const onInputClick = () => {
    fileInput.current?.click();
  }
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length == 0) {
      return;
    }
    const file = e.target.files[0];
    file.text().then(t => JSON.parse(t)).then(j => importCourses(j)).catch((r) => {
      console.error(r);
      toast("Error importing courses!", {
        description: "An error occurred while importing courses.",
      });
    });
  }
  const importCourses = (data: Course[]) => {
    if (onCourseChange) {
      onCourseChange(data);
    }
    toast("Courses imported!", {
      description: "Your courses have been imported.",
      action: {
        label: "Undo", onClick: () => {
          if (onCourseChange) {
            onCourseChange([]);
          }
        }
      }
    });
  };
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
  const clearCourses = () => {
    const temp = [...courses];
    if (onCourseChange) {
      onCourseChange([]);
    }
    toast("Courses cleared!", {
      description: "Restart from a blank slate.", action: {
        label: "Undo", onClick: () => {
          if (onCourseChange) {
            onCourseChange(temp);
          }
        }
      }
    });
  }
  const emptyCourse: Course = {
    name: "",
    color: "#000000",
    slots: []
  };

  const i = 0;

  const courseList = courses.map((course: Course) => (
    <Card key={`course.name ${i + 1}`} className="p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div><CardTitle className="tracking-normal font-normal text-md">
          <p>{course.name}</p>
        </CardTitle>
          <CardDescription>{course.slots.length} timeslots.</CardDescription>
        </div>
        <Swatch color={course.color} />
      </div>
      <CardFooter className="w-full flex justify-between p-0">
        <Button variant="destructive" className="p-2" onClick={() => {
          if (onCourseChange) {
            onCourseChange(courses.filter((c) => c.name !== course.name));
          }
        }}>
          Delete
        </Button>
        <CourseDialog variant="edit" course={course} pushEdit={(c: Course) => {
          if (onCourseChange) {
            const temp = [...courses];
            const index = temp.findIndex((e) => e.name === course.name);
            temp[index] = c;
            onCourseChange(temp);
          }
        }} />
      </CardFooter>
    </Card>
  ));

  return (
    <>
      <CardHeader className="pt-2 pb-2">
        <CardTitle>Courses</CardTitle>
        <CardDescription>Select a course, or create a new one.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 overflow-auto">
        <div className="w-full flex flex-col items-center justify-between gap-2 py-2">
          <CourseDialog variant="create" course={emptyCourse} pushEdit={(c: Course) => {
            if (onCourseChange) {
              onCourseChange([...courses, c]);
            }
          }} />
          <div className="w-full flex gap-2">
            <Button variant="destructive" className="w-full p-2" onClick={clearCourses}>
              Clear
            </Button>
            <Button variant="ghost" className="w-full p-2" onClick={exportCourses}>
              Export
            </Button>
            <Button variant="ghost" className="w-full p-2" onClick={onInputClick}>
              <input
                ref={fileInput}
                type="file"
                accept="*.json"
                className="hidden"
                onChange={onFileChange}
              />
              Import
            </Button>
          </div>
        </div>
        {courseList}
      </CardContent >
    </>
  )
};

export default CourseConfig;