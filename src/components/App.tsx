import { useState } from 'react'
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
  });

  return (
    <>
      <Sidebar
        config={calendarConfig}
        onConfigChange={(config: CalendarConfig) => setCalendarConfig(config)}
        courses={courses}
        onCourseChange={(courses: Course[]) => setCourses(courses)} />
      <Calendar config={calendarConfig} courses={courses} />
    </>
  )
}

export default App;