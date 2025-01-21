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

import { type TimeSlotKind, type TimeSlot, type TimeSlotStyle, type Course } from './Types';

const Calendar = ({
  startHour = 8,
  endHour = 19,
  startDay = 1,
  numberOfDays = 5,
}) => {
  // Days of the week for labels
  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  // Get the days we want to display
  const displayDays = [...daysOfWeek, ...daysOfWeek].slice(startDay - 1, startDay - 1 + numberOfDays);

  // Generate array of hours for the day
  const hours = Array.from(
    { length: endHour - startHour },
    (_, i) => startHour + i
  );

  const courses: Course[] = [// toy example courses
    {
      name: "Algorithms II",
      code: "CS450",
      color: "rgb(80, 150, 150)",
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
          day: 0,
          kind: "project",
          conflicts: 0
        },
        {
          startTime: 14,
          duration: 1,
          day: 0,
          kind: "exercises",
          conflicts: 0
        },
        {
          startTime: 11,
          duration: 3,
          day: 3,
          kind: "exercises",
          conflicts: 0
        }
      ]
    },
    {
      name: "Machine Learning",
      code: "CS433",
      color: "rgb(160, 70, 60)",
      slots: [
        {
          startTime: 9,
          duration: 1,
          day: 1,
          kind: "lecture",
          conflicts: 0
        },
        {
          startTime: 11,
          duration: 1,
          day: 1,
          kind: "project",
          conflicts: 0
        },
        {
          startTime: 15,
          duration: 1,
          day: 1,
          kind: "exercises",
          conflicts: 0
        }
      ]
    }
  ]

  const height = (i: number) => `${(i + 1) * 50}px`;
  const ypos = (i: number) => `${i * 50}px`;
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
          {displayDays.map((dayName, dayIdx) => (
            <div className="w-full h-full px-2 border-r-[1px] border-slate-200">
              <div className="w-full h-20 flex justify-center items-center">
                {dayName}
              </div>
              <div className="w-full h-full relative">
                {
                  courses.filter((course) => course.slots.some((slot) => slot.day === dayIdx))
                    .flatMap((course) => course.slots.filter((slot) => slot.day === dayIdx)
                      .map((slot) => ({ course, slot }))) // return an array of objects with course and slot
                    .sort((a, b) => a.slot.startTime - b.slot.startTime) // sorted by startTime
                    .map(({ course, slot }) => {
                      const height = `${slot.duration / (endHour - startHour) * 100 - 3}%`
                      const top = `${(slot.startTime - startHour) * 0.91 / (endHour - startHour) * 100}%`
                      let slotStyle: TimeSlotStyle = {
                        width: "100%",
                        height: height,
                        top: top,
                        left: "0",
                        padding: "0.25em 0.5em",
                        "background-color": course.color
                      }
                      return (
                        <div style={slotStyle} className="flex flex-col items-center justify-center absolute rounded">
                          <div className="text-white">{course.name}</div>
                          <div className="text-white">{slot.kind}</div>
                        </div>
                      )
                    })
                }</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card >
  );
};

export default Calendar;