# Journey Tracker — Implementation Plan

## Overview

A gamified run/walk tracking program that turns physical activity into charitable impact. Runners and walkers log their distance via GPS or manual entry, earn bricks (5KM = 1 brick), level up, unlock badges, and compete on leaderboards. All tracked activity feeds the same global brick counter that drives the organization's campaign milestones.

---

## User Flow

```
/run (event landing page)
  ↓  Register (name, email, phone)
  ↓  Runner ID stored in localStorage
  ↓
/journey (personal dashboard)
  ↓  Track runs via GPS or manual log
  ↓  Distance → points + bricks
  ↓  Streaks, levels, badges update automatically
  ↓
/journey/[id] (public profile — shareable)
  ↓
/admin/runs (approve pending manual entries)
```

---

## Page Architecture

### 1. `/journey` — Runner Dashboard

The core experience. Authenticated via runner ID in localStorage (looked up by email on return visits).

**Sections (top to bottom):**

| Section | Content |
|---|---|
| **Header** | Day streak counter, total KM, runner name + level badge |
| **Stats Grid** | EXP points (with progress to next level), Bricks earned, Race countdown |
| **Fitness Hub** | GPS tracking (START/STOP with live KM display) + Manual log input |
| **Community Rank** | Top runners leaderboard, current user highlighted |
| **Journey Timeline** | Horizontal carousel of milestone cards (Day 1, 7, 14, 21, 30) with locked/unlocked state |
| **Recent Runs** | List of last 10 runs with verification status badge |

### 2. `/journey/[id]` — Public Runner Profile

Shareable profile page anyone can view without being logged in.

- Runner name, location, level
- Total KM, total bricks, number of runs
- Recent runs list
- "Support This Runner" CTA → donation modal

### 3. `/admin/runs` — Admin Verification Dashboard

Restricted page (basic shared-secret check via env var or simple password).

- **Overview metrics**: Total runners, total KM (verified vs pending), total bricks from runs
- **Pending queue**: Manual entries not yet approved, with Approve/Reject buttons
- **Recent activity**: All runs with filters (all/verified/pending)
- **Top runners**: By verified distance

### 4. `/api/runs` — Run Logging (POST)

Log a new run entry. `verified` depends on source:

```json
{
  "runner_id": "uuid",
  "distance_km": 5.2,
  "source": "gps" | "manual",
  "run_date": "2026-06-23"
}
```

Response includes calculated bricks and updated runner stats.

### 5. `/api/runs/pending` — Admin Queue (GET)

Returns all runs where `verified = false`, ordered by `created_at DESC`. Admin-only.

### 6. `/api/runs/verify` — Admin Approval (PUT)

Batch-approve runs:

```json
{
  "run_ids": ["uuid1", "uuid2"]
}
```

Sets `verified = true`. Optionally supports reject (delete run).

---

## Data Model

### Existing Tables (no changes needed)

**`runners`**
| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | Already exists |
| `name` | TEXT | Already exists |
| `email` | TEXT UNIQUE | Already exists |
| `country` | TEXT | Already exists |
| `created_at` | TIMESTAMPTZ | Already exists |

**`runs`**
| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | Already exists |
| `runner_id` | UUID FK | Already exists |
| `distance_km` | NUMERIC | Already exists |
| `run_date` | DATE | Already exists |
| `verified` | BOOLEAN | Already exists (currently unused) |
| `created_at` | TIMESTAMPTZ | Already exists |

### New Migration: Add `source` column to `runs`

```sql
ALTER TABLE runs ADD COLUMN source TEXT CHECK (source IN ('gps', 'manual')) DEFAULT 'manual';
```

GPS-tracked runs: `source = 'gps'`, `verified = true` (set at insert time).  
Manual entries: `source = 'manual'`, `verified = false` (requires admin approval).

### Computed/Client-Side Fields (not stored)

| Field | Calculation |
|---|---|
| **Bricks** | `FLOOR(distance_km / 5)` per run |
| **Points (EXP)** | `FLOOR(distance_km * 2)` per run |
| **Level** | Beginner (< 51pts) → Active (51-150) → Runner (151-300) → Champion (301+) |
| **Streak** | Consecutive days with at least one run logged |

---

## Verification Model

| Source | Auto-Verified? | Why |
|---|---|---|
| **GPS** | ✅ Yes | Data comes from browser geolocation `watchPosition` — hard to fake |
| **Manual** | ❌ No — goes to admin queue | User types a number, admin must approve before bricks count toward totals |

**GPS tracking detail:**

1. User clicks "START GPS RUN"
2. Browser requests location permission
3. `navigator.geolocation.watchPosition()` fires every ~3s, recording lat/lng
4. Distance calculated via Haversine formula between successive points
5. Total accumulated on-screen in real-time
6. User clicks "STOP" → run saved with `verified = true`, `source = 'gps'`

---

## Gamification System

### Levels

| Level | Points Required | Visual |
|---|---|---|
| Beginner | 0–50 | Gray badge |
| Active | 51–150 | Blue badge |
| Runner | 151–300 | Purple badge |
| Champion | 301+ | Gold badge with glow |

### Badges

| Badge | Trigger | Icon |
|---|---|---|
| First Steps | First logged run | 🏅 |
| 5KM Captain | Total KM >= 5 | 🏆 |
| Brick Master | Total bricks >= 10 | 🧱 |
| Fire Starter | Streak >= 3 days | 🔥 |

### Milestone Timeline

| Day | Milestone | Status |
|---|---|---|
| Day 1 | Joined the Movement | Unlocked on first run |
| Day 7 | 10KM Milestone | Unlocked when total >= 10KM |
| Day 14 | Brick Specialist | Unlocked when bricks >= 5 |
| Day 21 | Kilifi Architect | Unlocked when level >= Runner |
| Day 30 | Race Day | Unlocked when streak >= 30 |

---

## Navigation

Add to `lib/layout-data.ts`:

```ts
{ label: "Run", href: "/journey" }
```

Replacing or supplementing the current "5km Run" link — `/run` remains the event landing page, `/journey` is the personal dashboard.

Admin nav link is not in the public nav — accessible at `/admin/runs` directly.

---

## Component Tree

```
app/
├── journey/
│   ├── page.tsx              — Dashboard (client component, checks localStorage for runner ID)
│   └── [id]/
│       └── page.tsx          — Public runner profile
└── admin/
    └── runs/
        └── page.tsx          — Admin verification dashboard

components/journey/
├── dashboard-hero.tsx        — Streak, name, level, total KM header
├── stats-grid.tsx            — EXP, Bricks, Countdown cards
├── fitness-hub.tsx           — GPS tracking + manual log panel
├── gps-tracker.tsx           — Start/stop button, live distance display, geolocation logic
├── manual-log.tsx            — KM input + add button
├── community-rank.tsx        — Leaderboard list
├── journey-timeline.tsx      — Horizontal milestone carousel
├── recent-runs.tsx           — Last 10 runs table/list
├── badge-display.tsx         — Badge icon grid
└── level-badge.tsx           — Level pill with color

components/admin/
├── admin-metrics.tsx          — Overview stat cards
├── pending-queue.tsx          — Pending runs table with approve/reject
└── admin-runs-table.tsx       — All runs with filters

lib/
├── journey.ts                 — Level calc, badge logic, streak calc, brick calc
└── gps.ts                     — Haversine distance, geolocation helpers

hooks/
└── use-gps-tracker.ts         — React hook wrapping geolocation API
```

---

## API Routes Summary

| Route | Method | Purpose | Auth |
|---|---|---|---|
| `/api/runners` | POST | Register runner | Public |
| `/api/runners/leaderboard` | GET | Top runners by distance | Public |
| `/api/runners/[id]` | GET | Single runner + aggregated stats | Public |
| `/api/runs` | POST | Log a run | Public (needs runner_id) |
| `/api/runs/[runner_id]` | GET | Runs for a runner | Public |
| `/api/runs/pending` | GET | Unverified runs queue | Admin |
| `/api/runs/verify` | PUT | Approve runs (batch) | Admin |
| `/api/runs/reject` | DELETE | Reject/delete a run | Admin |

---

## Implementation Phases

### Phase 1 — Foundation
- [ ] Add `source` column migration to Supabase
- [ ] Create `/api/runs` POST endpoint
- [ ] Create `/api/runners/[id]` GET endpoint
- [ ] Create `/api/runs/[runner_id]` GET endpoint
- [ ] Create `lib/journey.ts` utility functions (levels, bricks, points)
- [ ] Create `lib/gps.ts` + `hooks/use-gps-tracker.ts`

### Phase 2 — Runner Dashboard
- [ ] Build `/journey/page.tsx` with localStorage auth
- [ ] Build all `components/journey/*` components
- [ ] GPS tracking integration
- [ ] Manual log integration
- [ ] Leaderboard display (consumes existing `/api/runners/leaderboard`)
- [ ] Gamification display (levels, badges, streaks)

### Phase 3 — Public Profile
- [ ] Build `/journey/[id]/page.tsx`
- [ ] Shareable runner card
- [ ] Link from dashboard to public profile

### Phase 4 — Admin Dashboard
- [ ] Build `/admin/runs/page.tsx`
- [ ] Create `/api/runs/pending` GET endpoint
- [ ] Create `/api/runs/verify` PUT endpoint
- [ ] Create `/api/runs/reject` DELETE endpoint
- [ ] Build admin metrics + pending queue UI

### Phase 5 — Navigation & Polish
- [ ] Add `/journey` to header nav
- [ ] Post-registration redirect to `/journey`
- [ ] Event tracking (PostHog) for all interactions
- [ ] Responsive design pass
- [ ] Error states + loading skeletons
