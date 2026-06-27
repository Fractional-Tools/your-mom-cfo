# HEALTH — Client Health

**Slide**: ClientGradeSlide  
**Code**: HEALTH  

---

## Value Prop

Which clients are easiest to work with (pays on time, steady work, low switch cost). Answers: *Which clients are your best (and worst) to work with?*

---

## Expected Data

**Inputs**:
- Per client: `grade` (A/B/C), `paysOnTime`, `steadyWork`, `lowSwitchCost`

**Sources**:
- Invoice due date vs paid date → paysOnTime
- Calendar consistency (variance in hours/week) → steadyWork
- SWITCH job output (switch cost per client) → lowSwitchCost

**Outputs**: Per client: `name`, `grade`, `paysOnTime`, `steadyWork`, `lowSwitchCost`

---

## Build Prompt

> **Build a job that computes Client Health (grade per client).**  
> The job runs on a schedule (e.g. weekly). For each user: (1) get clients; (2) for each client: (a) paysOnTime: query invoices, compare due_date to paid_at, compute % paid within N days of due; (b) steadyWork: from calendar events, compute variance in weekly hours over last 8 weeks, low variance = steady; (c) lowSwitchCost: from SWITCH job or derive switch count per client from calendar; (3) combine signals into grade (A/B/C): e.g. A = pays on time + steady + low switch; C = late payments or high variance or high switch; (4) store or expose per-client grade, paysOnTime, steadyWork, lowSwitchCost.  
> Depends on invoice data and calendar. SWITCH job may need to run first to provide per-client switch cost.
