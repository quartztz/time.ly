import { type Course, type CalendarProps } from './Types';
import type { JSX } from "react";
import TimeSlotComponent from './TimeSlot';

export const DayComponent = (
  name: string,
  idx: number,
  courses: Course[],
  config: CalendarProps
): JSX.Element => {
  const daySlots = courses
    .flatMap((course) => course.slots.filter((slot) => slot.day === idx)
      .map((slot) => ({ slot, course })))
    .sort((a, b) => a.slot.startTime - b.slot.startTime);

  return (
    <div id="day" className="w-full h-full px-2 border-r-[1px] border-slate-200" >
      <div className="w-full h-20 flex justify-center items-center">
        {name}
      </div>
      <div className="w-full h-full relative">
        {
          daySlots.map(({ course, slot }) =>
            TimeSlotComponent(course, slot, config))
        }
      </div>
    </div >
  );
}