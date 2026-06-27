# VAL — Client Value

**Slide**: ClientValueSlide  
**Code**: VAL  

---

## Value Prop

Which clients pay the most per hour (effective rate). Answers: *Which clients give you the best return per hour?*

---

## Expected Data

**Inputs**:
- Per client: `name`, `revenue` (from paid invoices), `hours` (from calendar or invoice line items)
- Derived: `effectiveRate` = revenue ÷ hours

**Sources**:
- `clients` + `invoices` (paid) → revenue per client
- Calendar events (clientId, duration) or invoice hours → hours per client

**Outputs**: Per client: `name`, `revenue`, `hours`, `effectiveRate`. Aggregates: `topRate`, `bottomRate`, `gap`

---

## Build Prompt

> **Build a job that computes Client Value (effective rate per client).**  
> The job runs on a schedule (e.g. weekly or on-demand). For each user: (1) get clients; (2) for each client, sum paid invoice amounts (invoices where client_id = client.id, status = paid) for the period (e.g. last 3 months or YTD); (3) sum hours per client from calendar events (clientId match) or from invoice line items; (4) compute effectiveRate = revenue / hours for each client; (5) sort by effectiveRate descending; (6) store or expose per-client name, revenue, hours, effectiveRate; topRate, bottomRate, gap.  
> Use existing invoice and calendar queries. Handle clients with zero hours (exclude or show N/A).
