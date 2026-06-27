# SWITCH — Context Switching Tax

**Slide**: ContextSwitchSlide (slide 3)  
**Code**: SWITCH  

---

## Value Prop

Tells users how well they're handling their utility rate. Too many clients on small engagements means they lose time between clients — context switching eats into billable capacity. Answers: *How much time and money are you losing to switching between clients?*

---

## Expected Data

**Inputs**:
- `hoursLostPerWeek` — time lost to switching
- `avgSwitchesPerDay` — how often they switch
- `activeClients` — number of clients in period
- `costPerHour` — bill rate (from preferences, for dollar impact)

**Sources**: Calendar events (clientId, start, end). Sort by start; count consecutive events with different clientId = one switch.

**Outputs**: `hoursLostPerWeek`, `avgSwitchesPerDay`, `activeClients`, `costPerHour`, `weeklyDollarCost`

---

## Build Prompt

> **Build a job that computes Context Switching Tax.**  
> The job runs on a schedule (e.g. daily). For each user with connected calendars: (1) query calendar events for the last 7 days; (2) sort events by start time; (3) for each day, count unique clients and count switches (consecutive events with different clientId); (4) compute hoursLostPerWeek = avgSwitchesPerDay × 7 × (rampUpMinutes / 60), default rampUpMinutes = 15; (5) get costPerHour from preferences; (6) store or expose activeClients, avgSwitchesPerDay, hoursLostPerWeek, costPerHour, weeklyDollarCost.  
> Use existing event fetching and event.clientId from extendedProperties.private.id or clientId.
