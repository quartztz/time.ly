import { Fragment, useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Calendar from "@/components/Calendar";
import type { CalendarConfig, Course, Palette } from "@/lib/Types";
import d from "dom-to-image";
import paletteData from "@/assets/palettes.json";
import { daysOfWeek } from "@/lib/Common";

const App = () => {
  const [courses, _setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem("courses");
    return saved ? JSON.parse(saved) : [];
  });

  const [calendarConfig, setCalendarConfig] = useState<CalendarConfig>(() => {
    const saved = localStorage.getItem("calendar");
    return saved
      ? JSON.parse(saved)
      : {
          startHour: 8,
          endHour: 19,
          startDay: 1,
          numberOfDays: 5,
          showHours: true,
        };
  });

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
    localStorage.setItem("calendar", JSON.stringify(calendarConfig));
  }, [courses, calendarConfig]);

  const [palette, changePalette] = useState<Palette>(paletteData[0]);

  const recolor = (palette: Palette) => {
    courses.map((course, idx) => {
      course.color = palette.colors[idx % palette.colors.length];
    });
  };
  const setPalette = (palette: Palette) => {
    recolor(palette);
    changePalette(palette);
  };

  const imageRef = useRef<HTMLDivElement | null>(null);

  const saveImage = async () => {
    const elem = imageRef.current as Node;
    d.toJpeg(elem, { quality: 1 }).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "calendar.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };

  const detectConflicts = (courses: Course[]) => {
    daysOfWeek.forEach((day, idx) => {
      const daySlots = courses
        .flatMap((course) => course.slots.filter((slot) => slot.day === idx))
        .sort((a, b) => a.startTime - b.startTime);
      let col_idx = 0;
      daySlots.forEach((slot) => {
        const overlaps = daySlots.filter(
          (s) =>
            s !== slot &&
            s.startTime < slot.startTime + slot.duration &&
            s.startTime + s.duration > slot.startTime,
        );
        let cnt = 1;
        for (let i = 0; i < overlaps.length; ++i) {
          cnt++;
          for (let j = 0; j < i; ++j) {
            if (
              overlaps[j].startTime + overlaps[j].duration <=
              overlaps[i].startTime
            ) {
              cnt--;
            }
          }
        }
        col_idx = (col_idx + 1) % cnt;
        if (overlaps.some((s) => s.col_index == col_idx)) {
          col_idx--;
        }
        slot.conflicts = Math.max(cnt, 1);
        slot.col_index = overlaps.length == 0 ? 0 : col_idx;
      });
    });
  };

  const setCourses = (courses: Course[]) => {
    detectConflicts(courses);
    console.log(courses);
    _setCourses(courses);
  };

  return (
    <>
      <div className="hidden sm:flex gap-4 h-full w-full">
        <Sidebar
          config={calendarConfig}
          onConfigChange={(config: CalendarConfig) => setCalendarConfig(config)}
          courses={courses}
          onCourseChange={(courses: Course[]) => setCourses(courses)}
          save={saveImage}
          palette={palette}
          setPalette={setPalette}
        />
        <div ref={imageRef} className="w-full">
          <Calendar config={calendarConfig} courses={courses} />
        </div>
      </div>
      <div className="sm:hidden flex justify-center items-center h-full w-full">
        <p className="text-center w-3/5">
          time.ly isn't optimized for mobile yet! come back later, or open it on
          your desktop browser.
        </p>
      </div>
    </>
  );
};

export default App;
