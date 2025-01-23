import { Sidebar } from './Sidebar'
import Calendar from './Calendar'
import { useState } from 'react'
import type { CalendarProps } from './Types'

const App = () => {

  const [calendarConfig, setCalendarConfig] = useState<CalendarProps>({
    startHour: 8,
    endHour: 19,
    startDay: 1,
    numberOfDays: 5,
  })

  return (
    <>
      <Sidebar
        config={calendarConfig}
        onConfigChange={(config: CalendarProps) => setCalendarConfig(config)} />
      <Calendar {...calendarConfig} />
    </>
  )
}

export default App;