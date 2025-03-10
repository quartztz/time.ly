import type { CalendarConfig, Palette } from "@/lib/Types";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "./ui/checkbox";
import paletteData from "@/assets/palettes.json";

interface GeneralConfigProps {
  onConfigChange?: (config: CalendarConfig) => void;
  config: CalendarConfig;
  palette: Palette;
  setPalette: (palette: Palette) => void;
}

const GeneralConfig = ({
  onConfigChange,
  config,
  palette,
  setPalette,
}: GeneralConfigProps) => {
  const dayToInt: { [key: string]: number } = {
    // ew
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };

  return (
    <>
      <CardHeader className="pt-2">
        <CardTitle>General</CardTitle>
        <CardDescription>
          Customize the look and feel of your timetable. All times are specified
          as 24-hour time.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 flex-col gap-2">
        <div className="flex justify-start h-full items-center">Start Day</div>
        <div className="flex justify-end h-full">
          <Select
            defaultOpen={false}
            defaultValue="Monday"
            onValueChange={(value) =>
              onConfigChange &&
              onConfigChange({
                ...config,
                startDay: dayToInt[value],
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Monday" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(dayToInt).map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-start h-full items-center">Day Count</div>
        <div className="flex justify-end h-full">
          <Select
            defaultOpen={false}
            defaultValue={`${config.numberOfDays}`}
            onValueChange={(value) =>
              onConfigChange &&
              onConfigChange({
                ...config,
                numberOfDays: parseInt(value),
              })
            }
          >
            <SelectTrigger className="w-1/4 min-w-14">
              <SelectValue placeholder={config.numberOfDays} />
            </SelectTrigger>
            <SelectContent>
              {[...Array(7).keys()]
                .map((x) => (x + 1).toString())
                .map((dayIdx) => (
                  <SelectItem key={dayIdx} value={dayIdx}>
                    {dayIdx}
                  </SelectItem>
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
            onChange={(e) =>
              onConfigChange &&
              onConfigChange({
                ...config,
                startHour: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div className="flex justify-start h-full items-center">End Time</div>
        <div className="flex justify-end">
          <input
            type="number"
            min="6"
            max="24"
            className="w-full rounded border border-slate-200 p-2"
            value={config.endHour}
            onChange={(e) =>
              onConfigChange &&
              onConfigChange({
                ...config,
                endHour: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div className="flex justify-start h-full items-center">Show Hours</div>
        <div className="w-full flex justify-end p-2">
          <Checkbox
            checked={config.showHours}
            onCheckedChange={(value) =>
              onConfigChange &&
              onConfigChange({
                ...config,
                showHours: value ? true : false,
              })
            }
          />
        </div>
        <div className="flex justify-start h-full items-center">
          Calendar Palette
        </div>
        <div className="w-full flex justify-end p-2">
          <Select
            defaultOpen={false}
            defaultValue={palette.name}
            onValueChange={(value) =>
              setPalette(paletteData.find((p) => p.name === value) || palette)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={palette.name} />
            </SelectTrigger>
            <SelectContent>
              {paletteData.map((palette, idx) => (
                <SelectItem key={palette.name} value={palette.name}>
                  {palette.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </>
  );
};

export default GeneralConfig;
