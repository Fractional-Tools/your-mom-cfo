# Durable Google Calendar Cache

How we create a durable cache of Google calendar data that we can query and concatenate, caching only the past. When a past event is updated, we clear the cache.

---

## Goals

1. **Durable cache** — Store past calendar events so metric jobs can read from cache instead of re-querying the Google API.
2. **Query and concatenate** — Structure the cache so we can query by date range and append new days as they become "past."
3. **Only cache the past** — Future events change often (reschedules, cancellations). Past events are stable. We cache Jan 1 → yesterday (or today) and avoid caching future dates.
4. **Invalidate on past-event update** — If a user edits or deletes a past event, we clear the cache so the next run re-fetches and gets correct data.

---

## Cache Structure

Store by **year** and **week** (ISO week). All timestamps assumed **UTC**.

**`calendar_cache`** (Option B: merged per user)

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | PK |
| uid | uuid | User ID |
| year | int | Year (e.g. 2025) |
| week | int | ISO week 1–53 |
| fetched_at | timestamptz | When fetched |
| data | jsonb | Events from all calendars, concatenated |
| event_count | int | Count |

**Unique**: `(uid, year, week)`. One row per user per week. Events from all connections/calendars merged into `data`.

**Event shape** (each object in `data`): Store computed fields so we can filter fast without parsing datetimes:
- `year` (int) — e.g. 2025
- `week` (int) — ISO week 1–53
- `day_of_year` (int) — 1–366
- `month` (int) — 1–12

Compute these from `event.start` when caching. Filter in code: `events.filter(e => e.year === 2025 && e.week === 12)`.

**Query**: To get YTD, `SELECT * FROM calendar_cache WHERE uid = ? AND (year, week) <= (current_year, current_week) ORDER BY year, week`. Concatenate `data` from results. Filter by year/week/day_of_year/month in code. Use UTC for current year/week.

**Append**: When a new week becomes "past," fetch that week, insert row with `year` and `week`. No need to re-fetch prior weeks.

---

## Only Cache the Past

- Cache only weeks where `(year, week) <= (current_year, current_week)` in UTC. Never cache future weeks.
- **Weekly append job**: Each week, fetch the week that just ended, insert row with `year` and `week`. Keeps cache current.
- **Full rebuild**: On first run or when cache is cleared, fetch all past weeks YTD.

---

## Invalidate on Past-Event Update

When a **past** event is updated or deleted, clear the cache so the next run re-fetches.

### Trigger: Google Calendar webhook

Google sends a push notification when calendar events change. The platform already has `handler-google` (or equivalent) that receives these. The webhook does **not** include which event changed — only that *something* changed.

**Flow**:
1. Webhook received → we know the calendar had a change.
2. We don't know if it was a past or future event.
3. **Option A (conservative)**: Clear the insight cache for that user/calendar. Next run re-fetches. Safe but may over-invalidate (e.g. user edits a future event, we clear anyway).
4. **Option B (targeted)**: Webhook triggers a job that fetches recent changes (Google Calendar API `events.list` with `updatedMin`). If any updated event has `start < today`, clear cache. More precise but extra API call.

**Recommendation**: Start with Option A — clear cache on any webhook. Simpler. If we need to reduce unnecessary clears, add Option B later.

### Clear action

- `DELETE FROM calendar_cache WHERE uid = ?`
- Or set `invalidated_at = now()` and treat as "stale" — next cache job sees it and rebuilds.

---

## Job Flow

### 1. Cache build (scheduled or on-demand)

- For each user with connected calendars:
  - Check if cache exists and is valid (not invalidated).
  - If empty or invalidated: fetch all past weeks YTD (UTC), store one row per `(year, week)`.
  - If valid and last cached week < current week (UTC): fetch missing weeks, insert new rows.

### 2. Refresh trigger (on calendar change)

When any calendar event changes, trigger a cache refresh so we rarely hit Google live:

1. **Webhook received** — Google/Outlook push notification fires (platform already has `handler-google`, `outlookCalendarWatchHandler`).
2. **Clear cache** — `DELETE FROM calendar_cache WHERE uid = ?`
3. **Trigger rebuild** — Enqueue cache build job for that user. Fetches full span from API, chunks by week, inserts rows.
4. **Next read** — Consumer reads from cache (fresh data). No live API call.

Build this process into the existing webhook handlers so every event change invalidates and refreshes the cache.

### 3. Metric jobs

- Read from `calendar_cache`. Never hit Google API directly for past events.

---

## Schema

```sql
-- Chunked by year + week. Merged per user (all calendars). All timestamps UTC.
CREATE TABLE calendar_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  uid uuid NOT NULL REFERENCES auth.users(id),
  year int NOT NULL,
  week int NOT NULL,
  fetched_at timestamptz NOT NULL DEFAULT now(),
  data jsonb NOT NULL,
  event_count int,
  UNIQUE(uid, year, week)
);
```

---

## Cache granularity: per-calendar vs merged

### Option A: Per connection + calendar

One row per `(uid, connection_id, calendar_id, year, week)`. Each calendar's events stored separately.

- **Pros**: Webhook fires per calendar → clear only that calendar's chunks. Append per calendar. Debug per calendar.
- **Cons**: More rows. Metric jobs must query all rows for user and merge `data` arrays.

### Option B: Single merged array (recommended)

One query against all connections/calendars for the user. Concatenate events into one array. One row per `(uid, year, week)`.

- **Pros**: One row per user per week. Metric jobs read one blob. Simpler. Fewer rows.
- **Cons**: Any webhook (any calendar) → clear all cache for that user. Can't incrementally update one calendar.

**Recommendation**: Option B. Simpler reads, fewer rows. Webhooks are infrequent; full clear on any change is acceptable.

---

## Open Questions

- **ISO week**: Use `date_trunc('week', ...)` or equivalent for UTC week boundaries. Week 1 = first week of year.
- **Outlook**: Same pattern for Outlook calendars? Separate cache table or unified with `provider` column?
