# Schema and Jobs

How we run and rerun jobs to build CFO insights. Assumes jobs run monthly or on-demand, with raw data and calculated values stored for the slides.

---

## Overview

1. **Calendar cache job** — Runs YTD query for all calendar events, stores in cache. Downstream jobs read from this instead of re-querying calendars.
2. **Trigger metric jobs** — After cache is built, trigger jobs to run against the cached data. Each metric (REV, CAP, SWITCH, etc.) is its own job.
3. **Each job runs its calc** — Each metric job reads cache + invoices + preferences + clients, runs its calculation, and when done stores its result in the current record.
4. **Single record, incremental updates** — One `insight_report_run` record per run. The record is created when the process starts (or by the first job). Each job updates `data.REV`, `data.CAP`, etc. as it completes.
5. **UI** — Reads the latest `insight_report_run` and renders slides from `data`.

**Benefits**:
- **Debug**: Raw data in cache can be inspected against the specific calc for each slide. If REV looks wrong, debug the REV job and its inputs (cache + invoices) in isolation.
- **Rerun per metric**: Fix a bug in CAP? Rerun only the CAP job. It reads the same cache and updates `data.CAP` in the record. No need to rerun everything.

---

## Calendar Cache Job

**Purpose**: Single job that fetches and stores YTD calendar events for all users. Downstream jobs read from this cache.

**Details**: See [Durable Calendar Cache](./calendar-cache-durable.md) — cache only the past, query and concatenate, clear cache when a past event is updated.

**Trigger**: Run monthly (e.g. 1st of month) or on-demand (e.g. user triggers refresh).

**Flow**:
1. For each user with connected calendars, query calendar API for events from Jan 1 → today (YTD).
2. Store raw events in `calendar_cache` by `year` and `week` (UTC). See [calendar-cache-durable.md](./calendar-cache-durable.md).
3. Include metadata: `uid`, `year`, `week`, `fetched_at`, `event_count`.

**Why YTD**: Most insights need year-to-date context (revenue, utilization, work-life balance, etc.). A single YTD cache lets all metric jobs use the same baseline without re-querying.

---

## Storage Schema (Proposed)

### Raw data

**`calendar_cache`** — Chunked by `year` and `week` (UTC). See [calendar-cache-durable.md](./calendar-cache-durable.md).

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | PK |
| uid | uuid | User ID |
| year | int | Year (e.g. 2025) |
| week | int | ISO week 1–53 |
| fetched_at | timestamptz | When fetched |
| data | jsonb | Raw events for this week |
| event_count | int | Count |

**Query**: `WHERE uid = ? AND (year, week) <= (current_year, current_week) ORDER BY year, week`. Concatenate `data`.

### Calculated values — Report record model

**`insight_report_run`** — One record per report run. Created when the process starts (or by the first metric job). Each metric job, when done, updates its key in the `data` object. The UI reads this record to render the slides.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | PK |
| uid | uuid | User ID |
| job_run_id | text | Reference to the job execution (e.g. Inngest run ID) that produced this |
| period_start | date | Start of calc period |
| period_end | date | End of calc period |
| created_at | timestamptz | When the record was created |
| data | jsonb | **Key-value object**: keys = metric codes (REV, CAP, SWITCH, …), values = name/value pairs for that metric |

**Data shape** — `data` is a JSON object where each key is a metric code and each value is the calculated output for that metric:

```json
{
  "REV": { "aheadPct": 10, "currentRevenue": 374000, "targetRevenue": 340000, "dayOfYear": 182, "totalDays": 365 },
  "CAP": { "targetPct": 65, "currentPct": 68, "billableHours": 109, "availableHours": 160 },
  "SWITCH": { "hoursLostPerWeek": 6.5, "avgSwitchesPerDay": 4, "activeClients": 3, "costPerHour": 200 },
  "BAL": { "offHoursPct": 28, "weekendHours": 6, "eveningHours": 8, "totalHoursThisWeek": 48 },
  ...
}
```

**Flow**: Process starts → create (or get) `insight_report_run` record. Each metric job runs, reads cache + other sources, computes, then updates the record: `data.REV = {...}`, `data.CAP = {...}`, etc. When a job finishes, it merges its key into the existing `data` object. UI reads the record and renders.

### UI read

- Query: `SELECT data, job_run_id, created_at FROM insight_report_run WHERE uid = $1 ORDER BY created_at DESC LIMIT 1`
- Render: For each slide (e.g. REV), read `data.REV` and pass `{ aheadPct, currentRevenue, targetRevenue, ... }` to the slide component.
- If no record: Show empty state or "Run report to see insights".

---

## Job Run Modes

### Monthly (scheduled)

- **Calendar cache**: Run 1st of month (or daily) — refresh YTD events.
- **Metric jobs**: Run after cache completes (or same day). Each metric job reads cache + invoices + preferences, computes, writes to `insight_metrics`.

### On-demand

- **User-triggered**: "Refresh my insights" → trigger calendar cache for that user, then metric jobs for that user.
- **Admin-triggered**: Rerun for specific user or all users (e.g. after bug fix).

### Rerun behavior

- **Full rerun**: Clear cache for user, rebuild calendar cache, rerun all metric jobs. Each job updates its key in the record.
- **Calc-only rerun**: Keep cache, rerun metric jobs (e.g. after formula change). Each job overwrites its key in `data`.
- **Single metric**: Rerun one metric job for one user (e.g. fix CAP). It reads the same cache and updates only `data.CAP` in the record. Other keys unchanged.

---

## Job Flow

```
┌─────────────────────┐
│ calendar-cache-cron │  (monthly or on-demand)
│  - Query YTD events │
│  - Store in cache   │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ insight_calendar_   │
│ cache_chunk         │  (year, week, UTC)
└─────────┬───────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────┐
│ Create/get insight_report_run record                     │
└─────────┬───────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────┐
│ Metric jobs (each its own job)                           │
│  REV job → read cache + invoices → calc → update data.REV│
│  CAP job → read cache + preferences → calc → update data.CAP
│  SWITCH job → read cache → calc → update data.SWITCH     │
│  ... each job stores its result in the current record    │
└─────────┬───────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────┐
│ insight_report_run  │  One record, updated incrementally
│  - job_run_id       │  Key reference to orchestrator/run
│  - data (jsonb)     │  Each job merges its key (REV, CAP, …)
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ UI                  │  Reads latest record, renders slides from data
└─────────────────────┘
```

---

## Data Sources by Metric

| Metric | Reads from cache? | Other sources |
|--------|-------------------|---------------|
| REV | No | preferences, invoices |
| CAP | Yes | preferences, cache (billable hours) |
| SWITCH | Yes | cache (events by client), preferences |
| BAL | Yes | cache (event times) |
| VAL | Yes | cache (hours by client), invoices |
| HEALTH | Partial | invoices (payment timing), SWITCH output, cache |
| VAC | Yes | cache (PTO blocks) or manual |
| GROWTH | Yes | cache (available hours), clients |
| ENG | No | clients (created_at), invoices |

---

## Debug and Rerun

- **Debug raw vs calc**: Cache holds raw events (by year/week). Each metric job's logic is isolated. To debug REV: inspect `calendar_cache` for the user, run REV job, compare its output to expected. Same for any metric.
- **Rerun per metric**: Rerun only the CAP job → it reads the same cache, recomputes, updates `data.CAP`. Other keys (REV, SWITCH, …) stay as-is. No full report rerun needed.

## Open Questions

- **Cache granularity**: One row per user (all events in jsonb) or normalized events table?
- **Retention**: How long to keep raw cache? (e.g. 1 year, then prune)
- **Cache invalidation**: When does cache refresh? Monthly + on-demand, or also on calendar webhook?
- **Record creation**: Who creates the `insight_report_run` record? Orchestrator before fan-out? First metric job? Or always "upsert" by uid + period?
