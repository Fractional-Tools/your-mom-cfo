# CAP — Capacity Utilization

**Slide**: UtilizationSlide (slide 2)  
**Code**: CAP  

---

## Value Prop

We help the user see how they're doing on **capacity consistency** — whether they're meeting the stated capacity needed to reach their salary goal for the year at their given bill rate. Answers: *Are you consistently hitting the capacity you need to reach your goal?*

---

## Expected Data

**Inputs**:
- `salaryGoal` — from preferences
- `billRate` — from preferences
- `normalWorkYear` — e.g. 2,080 hrs (configurable)
- `billableHours` — from calendar (events with clientId, billable)
- `availableHours` — from calendar (work hours in period)
- Prior period for trend (week-over-week, month-over-month)

**Formula**:
- Required billable hours = salary goal ÷ bill rate
- Target utilization % = required billable hours ÷ normal work year
- Current utilization % = billable hours ÷ available hours

**Outputs**: `targetUtilizationPct`, `currentUtilizationPct`, `billableHours`, `availableHours`, `priorPeriodPct` (for trend)

---

## Build Prompt

> **Build a job that computes Capacity Utilization.**  
> The job runs on a schedule (e.g. daily). For each user: (1) get `annualSalary` and `defaultBillRate` from preferences; (2) compute target utilization: `requiredHours = salaryGoal / billRate`, `targetPct = requiredHours / 2080`; (3) query calendar events for the period (e.g. last 7 or 30 days), filter billable events (clientId + billable flag); (4) compute `billableHours` = sum of event durations, `availableHours` = work hours in period (e.g. 40/wk); (5) compute `currentPct = billableHours / availableHours`; (6) fetch prior period for trend; (7) store or expose targetPct, currentPct, billableHours, availableHours, priorPct.  
> Use existing event fetching and event.clientId, extendedProperties.private.billable.
