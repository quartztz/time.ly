import { Sidebar } from './Sidebar'
import Calendar from './Calendar'
import { useState } from 'react'
import type { CalendarConfig } from './Types'
import { Button } from './ui/button'

const App = () => {

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
        onConfigChange={(config: CalendarConfig) => setCalendarConfig(config)} />
      <Calendar config={calendarConfig} />
    </>
  )
}

export default App;