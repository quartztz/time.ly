import type { CalendarConfig } from "@/lib/Types";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GeneralConfigProps {
  onConfigChange?: (config: CalendarConfig) => void;
  config: CalendarConfig;
}

const GeneralConfig = ({ onConfigChange, config }: GeneralConfigProps) => {

  // TODO: export this to a json config file for easier editing

  const dayToInt: { [key: string]: number } = { // ew
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
    "Sunday": 7
  }

  return (
    <>
      <CardHeader className="pt-2">
        <CardTitle>General</CardTitle>
        <CardDescription>
          Customize the look and feel of your timetable. All times are specified as 24-hour time.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 flex-col gap-2">
        <div className="flex justify-start h-full items-center">Start Day</div>
        <div className="flex justify-end h-full">
          <Select
            defaultOpen={false}
            defaultValue="Monday"
            onValueChange={(value) => onConfigChange && onConfigChange({
              ...config,
              startDay: dayToInt[value]
            })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Monday" />
            </SelectTrigger>
            <SelectContent>
              {
                Object.keys(dayToInt).map((day) => (
                  <SelectItem value={day}>{day}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-start h-full items-center">Day Count</div>
        <div className="flex justify-end h-full">
          <Select
            defaultOpen={false}
            defaultValue={`${config.numberOfDays}`}
            onValueChange={(value) => onConfigChange && onConfigChange({
              ...config,
              numberOfDays: parseInt(value)
            })}
          >
            <SelectTrigger className="w-1/4 min-w-14">
              <SelectValue placeholder={config.numberOfDays} />
            </SelectTrigger>
            <SelectContent>
              {["1", "3", "5", "7"].map((dayIdx) => (
                <SelectItem value={dayIdx}>{dayIdx}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-start h-full items-center">Start Time</div>
        <div className="flex justify-end">
          <input
            type="number"
            min="6"
            max="24"
            className="w-full rounded border border-slate-200 p-2"
            value={config.startHour}
            onChange={(e) => onConfigChange && onConfigChange({
              ...config,
              startHour: parseInt(e.target.value)
            })} />
        </div>
        <div className="flex justify-start h-full items-center">End Time</div>
        <div className="flex justify-end">
          <input
            type="number"
            min="6"
            max="24"
            className="w-full rounded border border-slate-200 p-2"
            value={config.endHour}
            onChange={(e) => onConfigChange && onConfigChange({
              ...config,
              endHour: parseInt(e.target.value)
            })} />
        </div>
      </CardContent>
    </>
  )
}

export default GeneralConfig;