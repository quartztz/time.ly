import type { JSX } from "react";
import type { Course, CalendarConfig, TimeSlot } from "@/lib/Types";
import TimeSlotComponent from "@/components/TimeSlot";

export const DayComponent = (
  name: string,
  idx: number,
  courses: Course[],
  config: CalendarConfig,
): JSX.Element => {
  const daySlots = courses
    .flatMap((course) =>
      course.slots
        .filter((slot) => slot.day === idx)
        .map((slot) => ({ slot, course })),
    )
    .sort((a, b) => a.slot.startTime - b.slot.startTime);

  return (
    <div
      id="day"
      key={name}
      className="w-full h-full flex flex-col px-2 divide-y-[1px] divide-y-slate-50"
    >
      <div className="w-full h-14 flex justify-center items-center">{name}</div>
      <div className="w-full h-full relative overflow-clip">
        {daySlots.map(({ course, slot }) =>
          TimeSlotComponent(course, slot, config),
        )}
      </div>
    </div>
  );
};
