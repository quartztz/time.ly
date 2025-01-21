import React, { useState } from 'react';
import { format, addDays, startOfDay, startOfWeek, addHours } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TimeSlotKind, TimeSlot, TimeSlotStyle, Course } from '../components/Types';

const Calendar = ({
  startHour = 8,
  endHour = 17,
  startDay = 1,
  numberOfDays = 5,
}) => {
  // Days of the week for labels
  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  // Get the days we want to display
  const displayDays = daysOfWeek.slice(startDay - 1, startDay - 1 + numberOfDays);

  // Generate array of hours for the day
  const hours = Array.from(
    { length: endHour - startHour },
    (_, i) => startHour + i
  );

  // grid-cols-6 is temporary.

  const height = (i) => `${(i + 1) * 50}px`;
  const ypos = (i) => `${i * 50}px`

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
        <div id="cal" className="px-4 w-full h-full grid grid-cols-5">
          {displayDays.map((e, i) => (
            <div className="w-full h-full px-2 border-r-[1px] border-slate-200">
              <div className="w-full h-20 flex justify-center items-center">
                {e}
              </div>

              <div style={{ top: ypos(i), height: height(i) }} className="w-full h-20 rounded bg-slate-400 relative flex flex-col justify-center items-center">
                <span>Algorithms II</span>

                <span><i>CS450</i></span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card >
  );
};

export default Calendar;