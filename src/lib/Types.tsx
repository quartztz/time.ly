import { z } from "zod";

export type CalendarConfig = {
  startHour: number;
  endHour: number;
  startDay: number;
  numberOfDays: number;
  showHours: boolean;
};

export type TimeSlotKind = "lecture" | "project" | "exercises";

export type TimeSlotStyle = {
  // all strings should be validated for correct format.
  width: string;
  height: string;
  top: string;
  left: string;
  padding: string;
  background: string; // as defined by course color
  filter: string;
};

const slotSchema = z.object({
  startTime: z.coerce.number(),
  duration: z.coerce.number(),
  day: z.coerce.number().min(0).max(6),
  kind: z.string(),
  conflicts: z.coerce.number(),
  // used for rendering, should be validated to be less than conflicts
  col_index: z.coerce.number(),
});

export type TimeSlot = z.infer<typeof slotSchema>;

export const courseSchema = z.object({
  name: z.string().min(1, "Course name cannot be empty"),
  code: z.string().optional(),
  color: z.string().regex(/^#[0-9a-f]{6}$/i, "Color must be a valid hex code"),
  slots: z.array(slotSchema),
});

export type Course = z.infer<typeof courseSchema>;

export const paletteSchema = z.object({
  name: z.string().min(1, "Palette name cannot be empty"),
  colors: z.array(z.string().min(1)),
});

export type Palette = z.infer<typeof paletteSchema>;
