import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import * as c from "@/components/Common";
import { courseSchema, type CalendarConfig } from './Types';
import { type Course } from './Types';
import { DayComponent } from './Day';

interface CalendarProps {
  config: CalendarConfig,
  courses: Course[]
}

const Calendar = ({ config, courses }: CalendarProps) => {
  // Days of the week for labels
  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  // destructure configuration
  const { startHour, endHour, startDay, numberOfDays } = config;

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
          <div id="timecol" className="w-1/8 h-full flex flex-col px-4">
            <div className="h-14 flex-none w-full flex justify-center items-center">
              Time
            </div>
            <div id="hours-flex" className="h-full flex flex-col">
              {hours.map((e) => (
                <div className="w-full h-full flex justify-center items-start">
                  {e}:00
                </div>
              ))}
            </div>
          </div>
          <div id="cal" className={`px-4 w-full h-full grid ${gridLayouts[numberOfDays]}`}>
            {displayDays.map((dayName: string, dayIdx: number) => (
              DayComponent(
                dayName,
                dayIdx + startDay - 1,
                courses,
                { startHour, endHour, startDay, numberOfDays }
              )
            ))}
          </div>
        </CardContent>
      </Card >
    </div>
  );
};

export default Calendar;