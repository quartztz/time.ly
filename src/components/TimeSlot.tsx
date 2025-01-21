import {
  type TimeSlotStyle,
  type Course,
  type TimeSlot,
  type CalendarProps
} from './Types';


// TODO: Conflict handling
const TimeSlotComponent = (
  course: Course,
  slot: TimeSlot,
  props: CalendarProps
) => {
  if (slot.startTime >= props.endHour) { // filter out slots that are outside of the calendar
    return null
  }

  const daylength = props.endHour - props.startHour
  const corr = 0.9 + 1 / (10 * daylength) // correction for the height of the slot
  const height = slot.duration / daylength * 100 - 3
  const top = (slot.startTime - props.startHour) * corr / daylength * 100

  let style: TimeSlotStyle = {
    width: "100%",
    height: `${height}%`,
    top: `${top}%`,
    left: "0",
    padding: "0.25em 0.5em",
    "background-color": course.color
  };

  return (
    <div style={style} className="flex flex-col items-center justify-center absolute rounded">
      <div className="text-white">{course.name}</div>
      <div className="text-white">{slot.kind}</div>
    </div>
  );
}

export default TimeSlotComponent;