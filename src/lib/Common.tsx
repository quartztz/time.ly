export const daysOfWeek: string[] = [
  'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday', 'Sunday'
];

// Get the days we want to display
export const displayDays = (
  startDay: number,
  dayCount: number
): string[] => {
  return [...daysOfWeek, ...daysOfWeek].slice(startDay - 1, startDay - 1 + dayCount)
};

export const hours = (startHour: number, endHour: number) => {
  return Array.from(
    { length: endHour - startHour },
    (_, i) => startHour + i
  );
}