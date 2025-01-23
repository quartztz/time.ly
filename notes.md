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

This algorithm works (somewhat) but struggles when, for example, the following conditions are met: 
|     course      |   time   | type | conflicts?
|-----------------|----------|------|------------
|computer science | 8am-10am |labs  <td rowspan=2>conflict:2</td>
|machine learning | 8am-10am |labs  |
|computer science | 10am-12pm|course <td rowspan=2>conflict:2</td>
|machine learning | 10am-12pm|course|

in this case, the state isn't properly updated between call sites, since the conflict values do not differ, but the conflict they refer to isn't the same.