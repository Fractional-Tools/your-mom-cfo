# BAL — Work-Life Balance

**Slide**: WorkBalanceSlide  
**Code**: BAL  

---

## Value Prop

How much work bleeds outside 9–5 and weekends. Answers: *How much of your work happens outside normal hours?*

---

## Expected Data

**Inputs**:
- `offHoursPct` — % of work hours outside 9am–5pm weekdays
- `weekendHours` — hours worked on Sat/Sun
- `eveningHours` — hours after 5pm
- `totalHoursThisWeek` — total work hours in period

**Sources**: Calendar events with start/end times. Derive from event timestamps: before 9am, after 5pm, weekend = off-hours.

**Outputs**: `offHoursPct`, `weekendHours`, `eveningHours`, `totalHoursThisWeek`

---

## Build Prompt

> **Build a job that computes Work-Life Balance.**  
> The job runs on a schedule (e.g. weekly). For each user: (1) query calendar events for the last 7 days (or configurable period); (2) for each event, parse start/end; (3) classify: before 9am or after 5pm = off-hours, Sat/Sun = weekend; (4) sum weekendHours, eveningHours (after 5pm), totalHours; (5) compute offHoursPct = (offHours + weekendHours) / totalHours × 100; (6) store or expose offHoursPct, weekendHours, eveningHours, totalHoursThisWeek.  
> Use existing event fetching. Assume user timezone or default to UTC. Consider configurable 9–5 window.

---

## Developer Questions — Edge States

Questions the developer must resolve to build this job:

### No data

- **No calendar connected** — What do we show? Placeholder ("Connect your calendar to see work-life balance") or hide the insight?
- **No events in period** — User has calendar but zero events in last 7 days. Return null/empty? Show "No work logged" with different copy?
- **Calendar connected but no events ever** — Same as above, or distinguish "new user" vs "inactive"?

### No vacation / rest detected

- **No time off in period** — All events are work. Do we explicitly flag "No rest detected" or is that implied by offHoursPct = 100?
- **No vacation blocks found** — If we ever cross-reference with PTO (VAC insight): user has no "out of office" events. Do we surface "Consider scheduling time off" or keep BAL and VAC separate?

### Stated goals

- **User target for off-hours %** — Do we store a preference (e.g. "I want under 20% off-hours")? If not, what's the default threshold for "issues" vs "balanced" vs "wins"?
- **Configurable 9–5 window** — Can the user set their own "normal hours" (e.g. 8–4, 10–6)? Where does that live — preferences?
- **Timezone** — How do we get the user's timezone? From profile, calendar, or default UTC? Off-hours classification depends on it.

### Time period

- **Year to date?** — Do we assume the calc is for YTD (Jan 1 → today)? Or a rolling window (e.g. last 4 weeks, last 30 days)? YTD gives annual picture; rolling gives recent trend.
- **Look into the future?** — Do we ever look ahead? E.g. "You have 12 evening meetings scheduled next week" or "Next 2 weeks are heavy on weekends." Or is BAL strictly backward-looking (past events only)?

### Other

- **Partial week** — User joined mid-week or we're mid-week. Do we normalize to "full week equivalent" or show raw hours with a caveat?
- **All-day events** — Event with no start/end time (all-day). How do we classify? Exclude? Count as full work day?
