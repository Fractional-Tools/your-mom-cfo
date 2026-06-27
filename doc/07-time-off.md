# VAC — Time Off

**Slide**: VacationSlide  
**Code**: VAC  

---

## Value Prop

Are you taking enough breaks to stay sharp? Answers: *How much time off have you taken, and when was your last real break?*

---

## Expected Data

**Inputs**:
- `daysTakenThisYear` — PTO/vacation days used
- `daysPlanned` — upcoming PTO
- `targetDays` — user's target (e.g. 15–20)
- `lastVacationWeeksAgo` — weeks since last vacation block (3+ days)

**Sources**: Calendar blocks (out of office, PTO, vacation) or manual tracking. Not modeled today — may need new calendar event type or user preference.

**Outputs**: `daysTakenThisYear`, `daysPlanned`, `targetDays`, `lastVacationWeeksAgo`

---

## Build Prompt

> **Build a job that computes Time Off.**  
> The job runs on a schedule (e.g. weekly). For each user: (1) query calendar for "out of office" or "PTO" or similar blocks (event summary or calendar-specific); (2) filter to blocks ≥ 1 day; (3) count daysTakenThisYear (YTD), daysPlanned (upcoming); (4) find last vacation block (≥ 3 consecutive days), compute lastVacationWeeksAgo; (5) get targetDays from preferences (or default 15–20); (6) store or expose daysTakenThisYear, daysPlanned, targetDays, lastVacationWeeksAgo.  
> Note: Calendar APIs may not have standard "out of office" — may need Google freeBusy, Outlook availability, or user-entered PTO. Consider adding a preferences field for manual PTO days if calendar data is insufficient.
