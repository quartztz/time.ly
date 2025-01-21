import {
  Card,
  CardContent,
} from "@/components/ui/card";
import * as c from "@/components/Common";
import { type Course } from './Types';
import { DayComponent } from './Day';

const Calendar = ({
  startHour = 8,
  endHour = 16,
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

  const courses: Course[] = [// toy example courses
    {
      name: "Math 101",
      code: "MATH101",
      color: "#FF0000",
      slots: [
        {
          startTime: 8,
          duration: 2,
          day: 0,
          kind: "lecture",
          conflicts: 0
        },
        {
          startTime: 10,
          duration: 1,
          day: 2,
          kind: "exercises",
          conflicts: 0
        }
      ]
    },
    {
      name: "Computer Science",
      code: "CS101",
      color: "#00FF00",
      slots: [
        {
          startTime: 9,
          duration: 1,
          day: 0,
          kind: "lecture",
          conflicts: 1
        },
        {
          startTime: 10,
          duration: 1,
          day: 3,
          kind: "lecture",
          conflicts: 0
        }
      ]
    }
  ]

  const gridLayouts: { [key: number]: string } = {
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
  };

  return (
    <Card id="calendar" className="w-full h-full flex justify-center items-center bg-white p-4">
      <CardContent className="w-full h-full flex flex-row">
        <div id="timecol" className="w-1/8 h-full flex flex-col px-4 border-x-[1px] border-slate-200">
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
  );
};

export default Calendar;