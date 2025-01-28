import { Fragment, useState } from "react";
import {
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CourseConfig from "@/components/CourseConfig";
import GeneralConfig from "@/components/GeneralConfig";
import type { CalendarConfig, Course } from "../lib/Types";
import { Toaster } from "sonner";
import SidebarIcon from "@/components/icons/SidebarIcon";

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
    return (id === state) ?
      "default" :
      "secondary"
  };

  return (
    <div id="sidebar" className={`max-w-[384px] max-h-full
      h-full flex flex-col transition-all duration-150 ease-in-out 
      ${open ? "w-[27%]" : "w-[3.25rem]"}`}>

      <div className="w-full flex gap-2 p-2 bg-slate-100 rounded">
        <Button id="toggle" variant="ghost" className="p-4 w-4 h-4 aspect-square" onClick={() => setOpen(!open)}>
          <SidebarIcon />
        </Button>
        {open && <div className="w-full flex items-center justify-start font-semibold italic">
          time.ly
        </div>}
      </div>
      {open &&
        <>
          <div className="w-full grid grid-cols-2 p-4 gap-4">
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