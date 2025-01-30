import { Fragment, useRef, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Calendar from '@/components/Calendar'
import type { CalendarConfig, Course } from '@/lib/Types'

const App = () => {

  const [courses, setCourses] = useState<Course[]>([]);

  const [calendarConfig, setCalendarConfig] = useState<CalendarConfig>({
    startHour: 8,
    endHour: 19,
    startDay: 1,
    numberOfDays: 5,
    showHours: true,
  });

  const imageRef = useRef<HTMLDivElement | null>(null);

  const saveImage = () => {
    console.log("exporting to image");
  }

  return (
    <>
      <div className="hidden md:flex gap-4 h-full w-full">
        <Sidebar
          config={calendarConfig}
          onConfigChange={(config: CalendarConfig) => setCalendarConfig(config)}
          courses={courses}
          onCourseChange={(courses: Course[]) => setCourses(courses)}
          save={saveImage} />
        <div ref={imageRef} className="w-full">
          <Calendar config={calendarConfig} courses={courses} />
        </div>
      </div >
      <div className="md:hidden flex justify-center items-center h-full w-full">
        <p className="text-center w-3/5">
          time.ly isn't optimized for mobile yet! come back later, or open it on your
          desktop browser.
        </p>
      </div>
    </>
  )
}

export default App;