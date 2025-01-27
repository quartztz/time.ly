import { z } from 'zod';

export type CalendarConfig = {
  startHour: number,
  endHour: number,
  startDay: number,
  numberOfDays: number,
}

export type TimeSlotKind = 'lecture' | 'project' | 'exercises';

export type TimeSlotStyle = { // all strings should be validated for correct format.
  width: string,
  height: string,
  top: string,
  left: string,
  padding: string,
  background: string, // as defined by course color
  filter: string,
};

const slotSchema = z.object({
  startTime: z.number(),
  duration: z.number(),
  day: z.number(),
  kind: z.string(),
  conflicts: z.number(),
});

export type TimeSlot = z.infer<typeof slotSchema>;

export const courseSchema = z.object({
  name: z.string().min(1, "Course name cannot be empty"),
  code: z.string().optional(),
  color: z.string().regex(/^#[0-9a-f]{6}$/i, "Color must be a valid hex code"),
  slots: z.array(slotSchema),
});

export type Course = z.infer<typeof courseSchema>;
