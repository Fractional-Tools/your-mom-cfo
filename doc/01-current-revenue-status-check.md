# REV — Current Revenue Status Check

**Slide**: MomCFOSlide  
**Code**: REV  

---

## Value Prop

Compares current revenue to date against stated annual salary target. Answers: *Are you on track to hit your annual goal?*

---

## Expected Data

**Inputs**:
- `targetRevenue` — annual salary goal (from preferences)
- `currentRevenue` — billed YTD (from paid invoices)
- `dayOfYear` / `totalDays` — year progress

**Sources**:
- `preferences.annualSalary` → target
- `invoices` (status = paid, YTD) → sum of amounts
- `moment()` for day-of-year

**Outputs**: `aheadPct` (or behind), `currentRevenue`, `targetRevenue`, `dayOfYear`, `totalDays`

---

## Build Prompt

> **Build a job (or API) that computes Current Revenue Status Check.**  
> For each user: (1) get `annualSalary` from preferences; (2) query paid invoices where period overlaps YTD, sum `totals.amount`; (3) compute `dayOfYear` and `totalDays`; (4) compute `expectedRevenue = targetRevenue × (dayOfYear / totalDays)`; (5) compute `aheadPct = ((currentRevenue - expectedRevenue) / expectedRevenue) × 100`; (6) return targetRevenue, currentRevenue, aheadPct, dayOfYear, totalDays.  
> UI already has SalaryProgressPanel and MetricsRow; job can power real-time or cached values.
