import {
  type TimeSlotStyle,
  type Course,
  type TimeSlot,
  type CalendarProps
} from './Types';

const TimeSlotComponent = (
  course: Course,
  slot: TimeSlot,
  props: CalendarProps,
  cnt_conflicts: number
) => {
  if (slot.startTime >= props.endHour) { // filter out slots that are outside of the calendar
    return null
  }


  const daylength = props.endHour - props.startHour
  const corr = 0.9 + 1 / (10 * daylength) // top alignment correction
  const height = slot.duration / daylength * 100 - 3
  const top = (slot.startTime - props.startHour) * corr / daylength * 100
  let style: TimeSlotStyle = {
    width: "100%",
    height: `${height}%`,
    top: `${top}%`,
    left: "0",
    padding: "0.25em 0.5em",
    "background-color": course.color
  }
  if (slot.conflicts != 0) {
    style.left = `${cnt_conflicts / slot.conflicts * 100}%`
    style.width = `${100 / slot.conflicts - 3}%`
  }

  return (
    <div style={style} className="flex flex-col items-center justify-center absolute rounded">
      <div className="text-white text-center">{course.name}</div>
      <div className="text-white text-center">{slot.kind}</div>
    </div>
  );
}

export default TimeSlotComponent;