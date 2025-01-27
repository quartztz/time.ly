import { useState } from "react";
import {
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CourseConfig from "@/components/CourseConfig";
import GeneralConfig from "@/components/GeneralConfig";
import type { CalendarConfig, Course } from "../lib/Types";
import { Toaster } from "sonner";

enum SidebarState {
  General = "general",
  Course = "course"
}

interface SidebarProps {
  config: CalendarConfig;
  onConfigChange?: (config: CalendarConfig) => void;
  courses: Course[];
  onCourseChange?: (courses: Course[]) => void;
}

const Sidebar = ({ config, onConfigChange, courses, onCourseChange }: SidebarProps) => {

  let [state, setState] = useState(SidebarState.Course);
  let [open, setOpen] = useState(true);

  const getButtonVariant = (id: string): "secondary" | "default" => {
    console.log(id, state)
    console.log(id === state)
    return (id === state) ?
      "default" :
      "secondary"
  };

  console.log(JSON.stringify(courses));

  return (
    <div id="sidebar" className={`max-w-[384px] max-h-full
      h-full flex flex-col transition-all duration-150 ease-in-out 
      ${open ? "w-[27%]" : "w-[3.25rem]"}`}>

      <div className="w-full flex gap-2 p-2 bg-slate-100 rounded">
        <Button id="toggle" variant="ghost" className="p-4 w-4 h-4 aspect-square" onClick={() => setOpen(!open)}>
          <svg width="100%" height="100%" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z"></path>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 8.75V19"></path>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8.25H19"></path>
          </svg>
        </Button>
        {open && <div className="w-full flex items-center justify-start font-semibold italic">
          time.ly
        </div>}
      </div>
      {open &&
        <>
          <div className="w-full grid grid-cols-2 p-4 gap-2">
            <Button id="general" variant={`${getButtonVariant("general")}`} onClick={() => setState(
              SidebarState.General
            )}>
              General
            </Button>
            <Button id="course" variant={`${getButtonVariant("course")}`} onClick={() => setState(
              SidebarState.Course
            )}>
              Course
            </Button>
          </div>
          <Card id="bar" className="w-full h-full overflow-auto pt-4">
            {
              (state == SidebarState.General) ?
                <GeneralConfig config={config} onConfigChange={onConfigChange} /> :
                <CourseConfig courses={courses} onCourseChange={onCourseChange} />
            }
          </Card>
        </>
      }
      <Toaster />
    </div >
  )
}

export default Sidebar;