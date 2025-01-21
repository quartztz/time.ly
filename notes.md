every course has the following fields: 
```typescript
type Course = {
  name: string,
  code: string | null,
  slots: TimeSlot[], 
  color: string, // validated to #XXXXXX?
}
```
a slot can be defined to have conflict: 
```typescript
// should be defined by the user
type TimeSlotKind = "exercise"|"course"|"project";

type TimeSlot = {
  // start + duration <= 24
  // arbitrary decision.
  startTime: number, // float in [0, 24[
  duration: number, // float in [0.25, 24 - start[
  kind: TimeSlotKind, 
  conflicts: number, // amount of timeslots this conflicts with, ideally < 4
};
```
a conversion can be made between the time $tc$ chosen by the user in "XX:XX" 24h format and the starttime format, simply as $st = \texttt{ashours}(tc)/24$ where $\texttt{ashours}$ is:
```
ashours x = (x.minutes / 60) + x.hours
```

the rendering algorithm loops over every day and over every timeslot in that day in chronological order (increasing in `startTime` parameter), keeping a conflict counter per day: 

```pseudocode
dayLength = endTime - startTime
for (day in showDays):
  prev_conflict = 0
  cnt_conflict = 0
  for (slot in day.timeslots.sorted): 
    slotStyle = {}
    if slot.conflicts == 0: 
      slotStyle.width = "100%"
      slotStyle.left = "0"
      prev_conflict = 0
      cnt_conflict = 0
    else: 
      if slot.conflicts != prev_conflict or 
         cnt_conflict = prev_conflict:
        panic!("bad conflict! these numbers are supposed to match!")
        return -1

      cnt_conflict++
      slotStyle.width = `{1/prev_conflict * 100}%`
      slotStyle.left = `{cnt_conflict/prev_conflict * 100}%` 
      
    slotStyle.top = `{slot.startTime/startTime * 100}%`
    slotStyle.height = `{slot.duration/dayLength * 100}%`
    slotStyle.padding = "0.25em 0.5em"
```
where
```typescript
type SlotStyle = { // should be validated
  width: string,
  height: string, 
  top: string, 
  left: string, 
  padding: string, 
  color: string, // as defined by course
}
```
