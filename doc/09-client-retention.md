# ENG — Client Retention

**Slide**: EngagementSlide  
**Code**: ENG  

---

## Value Prop

How long do your clients stick around? Answers: *What's your client tenure, and who's at risk of churning?*

---

## Expected Data

**Inputs**:
- Per client: `name`, `months` (tenure), `active` (had activity in last 90 days)

**Sources**:
- `client.created_at` or first invoice date → tenure in months
- Calendar events or invoices in last 90 days → active

**Outputs**: Per client: `name`, `months`, `active`. Aggregates: `avgMonths`, `longest`, `shortest`, `shortCount` (clients under 6 months)

---

## Build Prompt

> **Build a job that computes Client Retention (tenure per client).**  
> The job runs on a schedule (e.g. weekly) or on-demand. For each user: (1) get clients; (2) for each client, compute tenure: months = months since min(client.created_at, first_invoice.from_date) to today; (3) active = has calendar event or invoice in last 90 days; (4) compute aggregates: avgMonths, longest (client with max months), shortest, shortCount (clients with months < 6); (5) store or expose per-client name, months, active; aggregates.  
> Use client.created_at from Supabase. First invoice date may require querying invoices ordered by from_date. Ready to implement — data exists.
