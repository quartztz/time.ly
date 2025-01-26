import { CourseForm } from "@/components/CourseForm.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import GeneralConfig from "./GeneralConfig";
import { type CalendarConfig } from "./Types";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

enum SidebarState {
  General = "general",
  Course = "course"
}

interface SidebarProps {
  config: CalendarConfig;
  onConfigChange?: (config: CalendarConfig) => void;
}

export const Sidebar = ({ config, onConfigChange }: SidebarProps) => {

  let [state, setState] = useState(SidebarState.General);
  let [open, setOpen] = useState(true);

  const getButtonVariant = (id: string): "secondary" | "default" => {
    console.log(id, state)
    console.log(id === state)
    return (id === state) ?
      "default" :
      "secondary"
  };

  const dayToInt: { [key: string]: number } = {
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
    "Sunday": 7
  }

  return (
    <div className={`max-w-[400px] 
      h-full flex flex-col gap-2 transition-all duration-150 ease-in-out 
      ${open ? "w-1/4" : "w-[3.25rem]"}`}>

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
        <Card id="bar" className="w-full h-full">
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
          {
            (state == SidebarState.General) ?
              <>
                <CardHeader className="pt-2">
                  <CardTitle>General</CardTitle>
                  <CardDescription>
                    Customize the look and feel of your timetable. All times are specified as 24-hour time.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <div className="w-full h-10 grid grid-cols-2">
                    <div className="flex justify-start h-full items-center">Start Day</div>
                    <div className="flex justify-end h-full">
                      <Select
                        defaultOpen={false}
                        defaultValue="Monday"
                        onValueChange={(value) => onConfigChange && onConfigChange({
                          ...config,
                          startDay: dayToInt[value]
                        })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Monday" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            Object.keys(dayToInt).map((day) => (
                              <SelectItem value={day}>{day}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="w-full h-10 grid grid-cols-2">
                    <div className="flex justify-start h-full items-center">Day Count</div>
                    <div className="flex justify-end h-full">
                      <Select
                        defaultOpen={false}
                        defaultValue="5"
                        onValueChange={(value) => onConfigChange && onConfigChange({
                          ...config,
                          numberOfDays: parseInt(value)
                        })}
                      >
                        <SelectTrigger className="w-1/4 min-w-14">
                          <SelectValue placeholder="5" />
                        </SelectTrigger>
                        <SelectContent>
                          {["1", "3", "5", "7"].map((dayIdx) => (
                            <SelectItem value={dayIdx}>{dayIdx}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-2">
                    <div className="flex justify-start h-full items-center">Start Time</div>
                    <div className="flex justify-end">
                      <input
                        type="number"
                        min="6"
                        max="24"
                        className="w-full rounded border border-slate-200 p-2"
                        value={config.startHour}
                        onChange={(e) => onConfigChange && onConfigChange({
                          ...config,
                          startHour: parseInt(e.target.value)
                        })} />
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-2">
                    <div className="flex justify-start h-full items-center">End Time</div>
                    <div className="flex justify-end">
                      <input
                        type="number"
                        min="6"
                        max="24"
                        className="w-full rounded border border-slate-200 p-2"
                        value={config.endHour}
                        onChange={(e) => onConfigChange && onConfigChange({
                          ...config,
                          endHour: parseInt(e.target.value)
                        })} />
                    </div>
                  </div>
                </CardContent>
              </> :
              <>
                <CardHeader>
                  <CardTitle>Create Course</CardTitle>
                  <CardDescription>Changes are applied real-time.</CardDescription>
                </CardHeader>
                <CardContent className="Title" />
                <CardFooter>
                  <div>Click me</div>
                </CardFooter>
              </>
          }
        </Card>
      }
    </div >
  )
}