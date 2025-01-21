export type TimeSlotKind = 'lecture' | 'project' | 'exercises';

export type TimeSlot = {
  startTime: number, // float in [0, 24[ 
  duration: number, // float in [0.25, 24 - start[
  day: number, // int in [0, 6]
  kind: TimeSlotKind, // enum
  conflicts: number,  // int, < 4
};

export type TimeSlotStyle = { // all strings should be validated for correct format.
  width: string,
  height: string,
  top: string,
  left: string,
  padding: string,
  "background-color": string, // as defined by course color
};

export type Course = {
  name: string, // non-empty string
  code: string | undefined, // optional
  color: string, // validated to hex color, could become an array
  slots: TimeSlot[],
};
