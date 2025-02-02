import type {
  TimeSlotStyle,
  Course,
  TimeSlot,
  CalendarConfig
} from '@/lib/Types';

const TimeSlotComponent = (
  course: Course,
  slot: TimeSlot,
  props: CalendarConfig,
  cnt_conflicts: number
) => {
  if (slot.startTime >= props.endHour) { // filter out slots that are outside of the calendar
    return null
  }

  const daylength = props.endHour - props.startHour
  const height = slot.duration / daylength * 100
  const top = (slot.startTime - props.startHour) / daylength * 100

  let style: TimeSlotStyle = {
    width: "100%",
    height: `${height - 1}%`,
    top: `${top}%`,
    left: "0",
    padding: "0.25em 0.5em",
    background: course.color,
    filter: "",
  }
  if (slot.conflicts != 0) {
    style.left = `${cnt_conflicts / slot.conflicts * 100}% `
    style.width = `${100 / slot.conflicts - 2}% `
  }

  const textColor = (bg: string): "text-black" | "text-white" => {
    const hexToRgb = (hex: string) => {
      const bigint = parseInt(hex.slice(1), 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }

    const rgb = hexToRgb(bg);
    if (rgb) {
      // from: https://en.wikipedia.org/wiki/YCbCr#Y%E2%80%B2CbCr_to_xvYCC
      // inshallah this works
      const brightness = Math.round(
        (rgb[0] * 299 +
          rgb[1] * 587 +
          rgb[2] * 114) /
        1000
      )
      return brightness > 125 ? "text-black" : "text-white"
    }
    return "text-black"
  }

  return (
    <div
      style={style}
      key={`${course.name} ${slot.day} ${slot.startTime}`}
      className="flex flex-col items-start justify-start absolute rounded p-1">

      <div className={`${textColor(course.color)} font-semibold leading-5 text-sm`}>{course.name}</div>
      <div className={`${textColor(course.color)} text-white text-xs`}>{slot.kind}</div>
    </div>
  );
}

export default TimeSlotComponent;