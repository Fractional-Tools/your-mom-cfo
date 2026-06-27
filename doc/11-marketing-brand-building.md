# MKTG — Marketing & Brand Building (Experimental)

**Code**: MKTG  
**Status**: Experimental — not in React app

---

## Value Prop

Are you marketing and brand building enough? Answers: *Are you investing enough time and effort in activities that generate future demand?*

---

## How This Answers the Question

"Enough" marketing and brand building means:
- **Visibility** — Content, social, speaking, or other activities that put you in front of potential clients
- **Consistency** — Regular investment, not sporadic bursts
- **Balance** — Not so much that billable work suffers, not so little that pipeline dries up

**Too little**: No content, no outreach, no visibility — pipeline will stall.  
**Enough**: Steady, sustainable investment in demand generation.  
**Too much**: Marketing crowds out delivery — revenue at risk.

---

## Expected Data (To Be Defined)

**Potential inputs**:
- Time spent on marketing activities (calendar: content, social, networking, speaking)
- Content output (posts, articles, talks) — if we can detect or user logs
- Calendar events tagged or titled with marketing keywords ("blog", "LinkedIn", "webinar", "conference")
- Ratio of marketing hours to billable hours

**Challenge**: Hard to distinguish "marketing" from "admin" or "other" without tags. May need user-defined categories or calendar event types.

---

## Build Prompt

*TBD — depends on data availability. If we can identify marketing events: (1) query calendar for events matching marketing keywords or user-defined tags; (2) sum marketing hours per week/month; (3) compute marketingHours / totalWorkHours; (4) compare to stated target (e.g. 10–15% of time). If no tags: consider manual "marketing block" calendar or preference for "hours/week on marketing".*

---

## Open Questions

- How do we identify "marketing" events? Keywords? User tags? Separate calendar?
- What's the target? (e.g. 5–10% of time, or 2–4 hours/week)
- Do we count: content creation, social posting, networking, speaking, ads, SEO?
- Stated goal: Does the user set "I want to spend X hours/week on marketing"?
