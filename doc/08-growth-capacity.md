# GROWTH — Growth Capacity

**Slide**: GrowthSlide  
**Code**: GROWTH  

---

## Value Prop

Do you have room for more clients? Answers: *How many more clients could you take on, given your current capacity?*

---

## Expected Data

**Inputs**:
- `capacityClients` — additional clients you could take (available hours ÷ avg hours per client)
- `currentClients` — number of active clients
- `availableHoursPerWeek` — non-billable, non-PTO gaps in calendar
- `avgHoursPerClient` — from invoices or calendar, last 3 months

**Sources**:
- `clients.length` → currentClients
- Calendar → available hours (gaps, non-billable blocks)
- Invoices or calendar → avg hours per client

**Outputs**: `capacityClients`, `currentClients`, `availableHoursPerWeek`, `avgHoursPerClient`

---

## Build Prompt

> **Build a job that computes Growth Capacity.**  
> The job runs on a schedule (e.g. weekly). For each user: (1) get currentClients = clients.length (or active in last 90 days); (2) query calendar for the period (e.g. last 4 weeks), define work hours (e.g. 40/wk); (3) sum billable event hours per week; (4) availableHoursPerWeek = workHours - billableHours - PTO; (5) compute avgHoursPerClient from calendar events or invoice hours over last 3 months; (6) capacityClients = availableHoursPerWeek / avgHoursPerClient (or 0 if avg is 0); (7) store or expose capacityClients, currentClients, availableHoursPerWeek, avgHoursPerClient.  
> Use existing event fetching. May depend on CAP job for available hours logic. Handle edge case: no clients yet (avgHoursPerClient undefined).
