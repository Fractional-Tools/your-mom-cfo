# Calendar Cache — Implementation Todo

Incremental build. Refresh logic (webhook → clear → rebuild) will be added to the API over time. Test as we go.

---

## 1. Purge script

Script to clear cache. Support three modes:

- **By UID** — `DELETE WHERE uid = ?` (full user wipe)
- **By UID + Connection** — `DELETE WHERE uid = ? AND connection_id = ?`
- **By UID + Calendar + CalendarId** — `DELETE WHERE uid = ? AND connection_id = ? AND calendar_id = ?`

*Note: Current schema is merged per user (no `connection_id`/`calendar_id` on rows). If we add per-calendar purge, we may need to revisit schema or document that purge-by-connection/calendar is future work.*

---

## 2. Rebuild script

Script to populate/refresh the cache:

1. Query Google/Outlook for the full year (or configured span) for the user.
2. Chunk events by `(year, week)`.
3. For each chunk: compute `year`, `week`, `day_of_year`, `month` on each event.
4. Upsert into `calendar_cache` — one row per `(uid, year, week)`.

---

## 3. Query script

Script/function to read from cache:

- **Input**: `uid`, `clientId` (optional), `from`, `to` (date range)
- **Logic**:
  1. Determine which `(year, week)` rows overlap the date range.
  2. `SELECT data FROM calendar_cache WHERE uid = ? AND (year, week) IN (...)`
  3. Concatenate `data` arrays.
  4. Filter by date range (`from`/`to`) and optionally by `clientId` (extendedProperties.private.id).
- **Output**: Array of events.

---

## Out of scope (for now)

- **Refresh logic** — Webhook → clear → rebuild. Will be added to the API incrementally.
- **Integration with `queryAllCalendars`** — Route existing consumers to cache when appropriate. Later.
