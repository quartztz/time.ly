import { Sidebar } from './Sidebar'
import Calendar from './Calendar'
import { useState } from 'react'
import type { CalendarConfig } from './Types'
import courseData from './courses.json'
import { type Course, courseSchema } from './Types'

const App = () => {

  // Validate courses data
  // assumes the existence, need to rewrite this later.
  const from_file: Course[] = courseData.map(course => courseSchema.parse(course));
  const [courses, setCourses] = useState<Course[]>(from_file);

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
        courses={courses} />
      <Calendar config={calendarConfig} courses={courses} />
    </>
  )
}

export default App;