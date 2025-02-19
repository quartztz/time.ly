import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CourseConfig from "@/components/CourseConfig";
import GeneralConfig from "@/components/GeneralConfig";
import type { CalendarConfig, Course, Palette } from "../lib/Types";
import { Toaster } from "sonner";
import SidebarIcon from "@/components/icons/SidebarIcon";
import SaveIcon from "@/components/icons/SaveIcon";

enum SidebarState {
  General = "general",
  Courses = "courses",
}

interface SidebarProps {
  config: CalendarConfig;
  onConfigChange?: (config: CalendarConfig) => void;
  courses: Course[];
  onCourseChange?: (courses: Course[]) => void;
  save: () => void;
  palette: Palette;
  setPalette: (palette: Palette) => void;
}

const Sidebar = ({
  config,
  onConfigChange,
  courses,
  onCourseChange,
  save,
  palette,
  setPalette,
}: SidebarProps) => {
  let [state, setState] = useState(SidebarState.General);
  let [open, setOpen] = useState(true);

  const getButtonVariant = (id: string): "secondary" | "ghost" => {
    return id === state ? "secondary" : "ghost";
  };

  return (
    <div
      id="sidebar"
      className={`max-w-[384px] max-h-full
      h-full flex flex-col transition-all duration-250 ease-in-out gap-4
      ${open ? "w-[27%]" : "w-[3.25rem]"}`}
    >
      <div className="w-full flex gap-2 p-2 bg-slate-100 rounded">
        <Button
          id="toggle"
          variant="ghost"
          className="p-4 w-4 h-4 aspect-square"
          onClick={() => setOpen(!open)}
        >
          <SidebarIcon />
        </Button>
        {open && (
          <div className="w-full flex items-center justify-start font-semibold italic">
            time.ly
          </div>
        )}
      </div>
      <div className="flex h-fit items-center justify-center">
        <Button
          variant={`${open ? "default" : "ghost"}`}
          className={`${open ? "w-3/5" : "w-4 h-4 p-4"}`}
          onClick={save}
        >
          {open ? "Save to image" : <SaveIcon />}
        </Button>
      </div>
      {open && (
        <>
          <div className="w-full grid grid-cols-2 px-4 gap-4">
            <Button
              id="general"
              variant={`${getButtonVariant("general")}`}
              onClick={() => setState(SidebarState.General)}
            >
              General
            </Button>
            <Button
              id="courses"
              variant={`${getButtonVariant("courses")}`}
              onClick={() => setState(SidebarState.Courses)}
            >
              Courses
            </Button>
          </div>
          <Card id="bar" className="w-full h-full overflow-auto pt-4">
            {state == SidebarState.General ? (
              <GeneralConfig
                config={config}
                onConfigChange={onConfigChange}
                palette={palette}
                setPalette={setPalette}
              />
            ) : (
              <CourseConfig
                courses={courses}
                onCourseChange={onCourseChange}
                palette={palette}
              />
            )}
            <Toaster />
          </Card>
        </>
      )}
    </div>
  );
};

export default Sidebar;
