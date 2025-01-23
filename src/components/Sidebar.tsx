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
import { type CalendarProps } from "./Types";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

enum SidebarState {
  General = "general",
  Course = "course"
}

interface ConfigHandler {
  config: CalendarProps;
  onConfigChange?: (config: CalendarProps) => void;
}

export const Sidebar = ({ config, onConfigChange }: ConfigHandler) => {

  let [state, setState] = useState(SidebarState.General)

  const getVariant = (id: string): "outline" | "ghost" => {
    console.log(id, state)
    console.log(id === state)
    return (id === state) ?
      "outline" :
      "ghost"
  };

  return (
    <div className="w-1/3 max-w-[400px] h-full flex flex-col gap-2">
      <div className="w-full grid grid-cols-2 p-2 gap-2">
        <Button id="general" variant={`${getVariant("general")}`} onClick={() => setState(
          SidebarState.General
        )}>
          General
        </Button>
        <Button id="course" variant={`${getVariant("course")}`} onClick={() => setState(
          SidebarState.Course
        )}>
          Course
        </Button>
      </div>

      {
        (state == SidebarState.General) ?
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle>General</CardTitle>
              <CardDescription>
                Customize the look and feel of your timetable. All times are specified as 24-hour time.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
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
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
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
                    className="w-full rounded border border-slate-200 p-2"
                    value={config.endHour}
                    onChange={(e) => onConfigChange && onConfigChange({
                      ...config,
                      endHour: parseInt(e.target.value)
                    })} />
                </div>
              </div>
            </CardContent>
          </Card > :
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle>Create Course</CardTitle>
              <CardDescription>Changes are applied real-time.</CardDescription>
            </CardHeader>
            <CardContent className="Title" />
            <CardFooter>
              <div>Click me</div>
            </CardFooter>
          </Card>
      }
    </div >
  )
}