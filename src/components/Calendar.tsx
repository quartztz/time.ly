import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import * as c from "@/lib/Common";
import type { Course, CalendarConfig } from '@/lib/Types';
import { DayComponent } from '@/components/Day';

interface CalendarProps {
  config: CalendarConfig,
  courses: Course[]
}

const Calendar = ({ config, courses }: CalendarProps) => {
  // destructure configuration
  const { startHour, endHour, startDay, numberOfDays, showHours } = config;

  const displayDays = c.displayDays(startDay, numberOfDays);

  // Generate array of hours for the day
  const hours = c.hours(startHour, endHour);

  const gridLayouts: { [key: number]: string } = {
    1: "grid-cols-1",
    3: "grid-cols-3",
    5: "grid-cols-5",
    7: "grid-cols-7",
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Card id="calendar" className="w-full h-full flex flex-col justify-center items-center bg-white p-4">
        <CardHeader className="w-full flex items-center pt-1 pb-0 font-semibold">
          my timetable
        </CardHeader>
        <CardContent className="w-full h-full flex flex-row overflow-hidden">
          {showHours &&
            <div id="timecol" className="w-1/8 h-full flex flex-col px-2 divide-y-[1px] divide-y-slate-50">
              <div className="h-14 w-full flex justify-center items-center">
                Time
              </div>
              <div id="hours-flex" className="h-full flex flex-col py-2 divide-y-[1px] divide-y-slate-50">
                {hours.map((e) => (
                  <div className="w-full h-full flex justify-center items-start">
                    {e}:00
                  </div>
                ))}
              </div>
            </div>
          }
          <div id="cal" className={`px-4 w-full h-full grid ${gridLayouts[numberOfDays]} divide-x-[1px] divide-x-slate-50`}>
            {displayDays.map((dayName: string, dayIdx: number) => (
              DayComponent(
                dayName,
                dayIdx + startDay - 1,
                courses,
                { startHour, endHour, startDay, numberOfDays, showHours }
              )
            ))}
          </div>
        </CardContent>
      </Card >
    </div>
  );
};

export default Calendar;