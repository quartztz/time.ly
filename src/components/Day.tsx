import type { JSX } from "react";
import type { Course, CalendarConfig } from '@/lib/Types';
import TimeSlotComponent from '@/components/TimeSlot';

export const DayComponent = (
  name: string,
  idx: number,
  courses: Course[],
  config: CalendarConfig
): JSX.Element => {
  const daySlots = courses
    .flatMap((course) => course.slots.filter((slot) => slot.day === idx)
      .map((slot) => ({ slot, course })))
    .sort((a, b) => a.slot.startTime - b.slot.startTime);

  // println debug my beloved
  // console.log(`day: ${name}, courses: ${daySlots.map((e) => `\n\t${e.course.name} at ${e.slot.startTime} for ${e.slot.duration} conflicting ${e.slot.conflicts}`)}`)

  return (
    <div id="day" className="w-full h-full flex flex-col px-2">
      <div className="w-full h-14 flex justify-center items-center">
        {name}
      </div >
      <div className="w-full h-full relative">
        {
          (() => {
            let cnt_conflicts = 0;
            let prev_conflicts = 0;
            return daySlots.map(({ course, slot }) => {
              if (slot.conflicts == 0) {
                prev_conflicts == 0;
                cnt_conflicts = 0;
                return TimeSlotComponent(course, slot, config, cnt_conflicts);
              } else {
                if (slot.conflicts != prev_conflicts) { // discrepancy between states
                  if (prev_conflicts == 0) { // entering conflict zone
                    prev_conflicts = slot.conflicts;
                    cnt_conflicts = 0;
                    return TimeSlotComponent(course, slot, config, cnt_conflicts);
                  } else { // unreachable, panic
                    console.error("Conflict state discrepancy");
                    return null;
                  }
                } else { // same state, different member
                  cnt_conflicts++;
                  if (cnt_conflicts == prev_conflicts)
                    cnt_conflicts = 0;
                  return TimeSlotComponent(course, slot, config, cnt_conflicts);
                }
              }
            });
          })()
        }
      </div>
    </div >
  );
}