import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import * as c from "@/components/Common";
import { courseSchema } from './Types';
import { type Course } from './Types';
import { DayComponent } from './Day';
import coursesData from './courses.json';

const Calendar = ({
  startHour = 8,
  endHour = 20,
  startDay = 1,
  numberOfDays = 5,
}) => {
  // Days of the week for labels
  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];
  const displayDays = c.displayDays(startDay, numberOfDays);

  // Generate array of hours for the day
  const hours = c.hours(startHour, endHour);

  // Validate courses data
  const courses: Course[] = coursesData.map(course => courseSchema.parse(course));

  const gridLayouts: { [key: number]: string } = {
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
  };

  const color = {
    color: "rgb(160, 70, 60)",
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Card id="calendar" className="w-full h-full flex flex-col justify-center items-center bg-white p-4">
        <CardHeader className="w-full flex items-center py-2 font-semibold">
          quartztz' timetable
        </CardHeader>
        <CardContent className="w-full h-full flex flex-row overflow-hidden">
          <div id="timecol" className="w-1/8 h-full flex flex-col px-4">
            <div className="h-20 flex-none w-full flex justify-center items-center">
              Time
            </div>
            {hours.map((e) => (
              <div className="w-full h-full flex justify-center items-start">
                {e}:00
              </div>
            ))}
          </div>
          <div id="cal" className={`px-4 w-full h-full grid ${gridLayouts[numberOfDays]}`}>
            {displayDays.map((dayName: string, dayIdx: number) => (
              DayComponent(
                dayName,
                dayIdx,
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