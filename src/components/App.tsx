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

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        variant={sidebarOpen ? "default" : "outline"}
        className="fixed bottom-4 left-4 rounded-md h-10 w-fit"
      >
        toggle sidebar
      </Button >
      <Sidebar
        config={calendarConfig}
        onConfigChange={(config: CalendarConfig) => setCalendarConfig(config)}
        open={sidebarOpen} />
      <Calendar config={calendarConfig} />
    </>
  )
}

export default App;