# PIPELINE — Pipeline Maturity (Experimental)

**Code**: PIPELINE  
**Status**: Experimental — not in React app

---

## Value Prop

How mature is your pipeline? Answers: *Do you have enough qualified leads and deals in motion to fill capacity when clients churn or engagements end?*

---

## How This Answers the Question

A mature pipeline means:
- **Depth** — Deals at multiple stages (early conversations → proposals → closed)
- **Velocity** — Deals moving through stages, not stuck
- **Coverage** — Enough pipeline to replace current revenue if clients leave
- **Quality** — Leads are qualified, not just volume

**Low maturity**: Few or no deals in pipeline; all revenue at risk if one client leaves.  
**High maturity**: Multiple deals in progress; predictable flow of new work.

---

## Expected Data (To Be Defined)

**Potential inputs**:
- Deals/opportunities by stage (if we track pipeline)
- Calendar events tagged as "sales" or "proposal" or "discovery"
- Inbound vs outbound activity
- Time since last new client

**Challenge**: Platform may not have pipeline/CRM data. May need manual entry, integration, or inference from calendar (e.g. "Discovery call - Acme" = pipeline activity).

---

## Build Prompt

*TBD — depends on data availability. If pipeline data exists: compute stages, conversion rates, coverage ratio (pipeline value ÷ current revenue). If not: consider calendar-based proxy (meetings with "prospect" or "discovery" in title) or user-entered pipeline.*

---

## Open Questions

- Where does pipeline data live? CRM integration? Manual table? Calendar inference?
- What stages do we use? (e.g. Lead → Qualified → Proposal → Negotiation → Closed)
- How do we define "mature"? (e.g. pipeline value ≥ 2x monthly revenue, or deals in 3+ stages)
