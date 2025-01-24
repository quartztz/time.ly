import { Sidebar } from './Sidebar'
import Calendar from './Calendar'
import { useState } from 'react'
import type { CalendarProps } from './Types'
import { Button } from './ui/button'

const App = () => {

  const [calendarConfig, setCalendarConfig] = useState<CalendarProps>({
    startHour: 8,
    endHour: 19,
    startDay: 1,
    numberOfDays: 5,
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        variant={sidebarOpen ? "default" : "outline"}
        className="fixed bottom-4 left-4 rounded-full h-10 w-10"
      >
        S
      </Button >
      <Sidebar
        config={calendarConfig}
        onConfigChange={(config: CalendarProps) => setCalendarConfig(config)}
        open={sidebarOpen} />
      <Calendar {...calendarConfig} />
    </>
  )
}

export default App;