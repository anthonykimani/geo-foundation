# Journey Tracker — Full Context Document

> Share this entire file with the VPS opencode instance as context so it understands the project, what's been built, and what remains.

---

## 1. Project Overview

This is the **Gladys Erude Organization (GEO)** website — a non-profit (501c3 registered in the US, affiliate in Kenya) that builds classrooms in underserved communities across Kenya. The website is built with Next.js 16 + React 19 + PostgreSQL.

**Tagline:** *"Build a Classroom. Brick by Brick."*

**The core mechanic:** Every $1 donated = 1 brick. Every 5KM run/walk = 1 brick. Both feed the same global brick counter, which drives campaign milestones toward building physical classrooms.

**Repository:** `git@github.com:anthonykimani/geo-foundation.git`

---

## 2. Journey Tracker — What It Is

A gamified run/walk tracking program that turns physical activity into charitable impact:

- Runners and walkers log distance via **browser GPS** or **manual entry**
- Earn **bricks** (5KM = 1 brick), **points** (2 per KM), **levels**, **badges**
- Compete on **leaderboards**, build **streaks**
- All tracked activity feeds the **same global brick counter** as donations
- Admin can **approve/reject** manual entries

---

## 3. User Flow

```
/run (event landing page — describes the annual 5KM run)
  ↓  Register (name, email, phone)
  ↓  Runner ID stored in browser localStorage
  ↓
/journey (personal dashboard)
  ↓  Track runs via GPS or manual log
  ↓  Distance → points + bricks → levels + badges
  ↓
/journey/[id] (public profile — shareable link)
  ↓
/admin/runs (approve/reject pending manual entries)
```

---

## 4. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| UI | React 19.2, Tailwind CSS 4, shadcn/ui, Motion (Framer Motion) |
| Database | PostgreSQL via `pg` (node-postgres) — raw SQL, no ORM |
| CMS | Sanity (headless — page content, images, brick entries) |
| Analytics | PostHog |
| Maps | Leaflet (run route on /run page) |
| Payments | Pesapal (M-PESA/card KES) + PayPal (USD) + GoFundMe link |

---

## 5. Project Structure — Key Directories

```
erude/
├── app/                          # Next.js App Router pages + API routes
│   ├── api/
│   │   ├── bricks/               # GET — aggregated brick counter
│   │   ├── runners/              # POST — register runner
│   │   ├── runners/[id]/         # GET — runner by UUID or email
│   │   ├── runners/leaderboard/  # GET — top 20 runners
│   │   ├── runs/                 # POST — log a run
│   │   ├── runs/[runner_id]/     # GET — runs for a runner
│   │   ├── runs/pending/         # GET — unverified runs (admin)
│   │   ├── runs/verify/          # PUT — batch approve runs (admin)
│   │   ├── runs/reject/          # DELETE — reject a run (admin)
│   │   ├── pesapal/webhook/      # POST — Pesapal payment notification
│   │   └── paypal/webhook/       # POST — PayPal payment notification
│   ├── journey/                  # Runner dashboard
│   ├── journey/[id]/             # Public runner profile
│   ├── admin/runs/               # Admin verification dashboard
│   ├── run/                      # Annual 5KM run event page
│   └── ...                       # Other pages (about, impact, etc.)
├── components/
│   ├── journey/                  # Dashboard components (10 files)
│   ├── admin/                    # Admin components (2 files)
│   ├── run/                      # Run event page components
│   └── ...
├── lib/
│   ├── db.ts                     # PostgreSQL pool + query helpers
│   ├── journey.ts                # Level/brick/badge/streak logic
│   ├── gps.ts                    # Haversine distance calculation
│   └── ...
├── hooks/
│   └── use-gps-tracker.ts        # React hook for browser geolocation
├── supabase/migrations/
│   └── vps-init.sql              # Complete DB schema for VPS
└── .env                          # Environment variables
```

---

## 6. Database Schema (PostgreSQL)

### Table: `brick_transactions`

Tracks all donations (Pesapal, PayPal, GoFundMe, manual, run).

| Column | Type | Notes |
|---|---|---|
| `id` | BIGINT (PK) | Auto-increment |
| `donor_name` | TEXT | Nullable |
| `donor_email` | TEXT | Nullable |
| `amount` | NUMERIC | Required |
| `currency` | TEXT | `'USD'` or `'KES'` |
| `bricks` | INT (generated) | USD = `FLOOR(amount)`, KES = `FLOOR(amount/130)` |
| `payment_method` | TEXT | `pesapal`, `paypal`, `gofundme`, `manual`, `run` |
| `payment_ref` | TEXT | Payment reference ID |
| `status` | TEXT | `pending`, `completed`, `failed` |
| `anonymous` | BOOLEAN | Default false |
| `created_at` | TIMESTAMPTZ | Default now() |

### Table: `runners`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | `gen_random_uuid()` |
| `name` | TEXT | Required |
| `email` | TEXT UNIQUE | Used for returning runner lookup |
| `country` | TEXT | Default `'Kenya'` |
| `created_at` | TIMESTAMPTZ | Default now() |

### Table: `runs`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID (PK) | `gen_random_uuid()` |
| `runner_id` | UUID (FK → runners) | |
| `distance_km` | NUMERIC | Required |
| `run_date` | DATE | Default today |
| `verified` | BOOLEAN | GPS = true, Manual = false |
| `source` | TEXT | `'gps'` or `'manual'` |
| `created_at` | TIMESTAMPTZ | Default now() |

---

## 7. API Routes — Complete Reference

| Route | Method | Purpose | Request | Response |
|---|---|---|---|---|
| `/api/bricks` | GET | Aggregated brick total | — | `{ total, live, sanity }` |
| `/api/runners` | POST | Register a runner | `{ name, email, country }` | Runner object (201) |
| `/api/runners/[id]` | GET | Runner by UUID or email | — | `{ runner, stats, recentRuns }` |
| `/api/runners/leaderboard` | GET | Top 20 runners by KM | — | Array of `{ id, name, totalKm, totalBricks, totalRuns }` |
| `/api/runs` | POST | Log a run | `{ runner_id, distance_km, source }` | Run object (201) |
| `/api/runs/[runner_id]` | GET | All runs for a runner | — | Array of runs |
| `/api/runs/pending` | GET | Unverified manual runs | — | Array with nested runner info |
| `/api/runs/verify` | PUT | Batch approve runs | `{ run_ids: string[] }` | `{ verified: count, runs: [...] }` |
| `/api/runs/reject` | DELETE | Reject/delete a run | `?id=uuid` | `{ deleted: true }` |

---

## 8. Gamification System

### Levels

| Level | Points Required | Visual |
|---|---|---|
| Beginner | 0–50 | Gray badge (`#6b7280`) |
| Active | 51–150 | Blue badge (`#3b82f6`) |
| Runner | 151–300 | Purple badge (`#8b5cf6`) |
| Champion | 301+ | Gold badge with glow (`#f59e0b`) |

### Badges

| Badge | Name | Trigger |
|---|---|---|
| 🏅 | First Steps | First logged run |
| 🏆 | 5KM Captain | Total KM >= 5 |
| 🧱 | Mason 101 | Total bricks >= 10 |
| 🔥 | Fire Starter | Streak >= 3 days |
| 👑 | Champion Runner | Level = Champion |

### Metrics

| Metric | Formula |
|---|---|
| Bricks per run | `FLOOR(distance_km / 5)` |
| Points per run | `FLOOR(distance_km * 2)` |
| Streak | Consecutive days with >= 1 run |

### Milestone Timeline (displayed on dashboard)

| Day | Milestone | Unlock Condition |
|---|---|---|
| 1 | Joined the Movement | First run logged |
| 7 | 10KM Reached | Total KM >= 10 |
| 14 | Brick Specialist | Total bricks >= 5 |
| 21 | Kilifi Architect | Level >= Runner |
| 30 | Race Day | Streak >= 30 |

---

## 9. Verification Model

| Source | Auto-Verified? | How it works |
|---|---|---|
| **GPS** | ✅ Yes | Browser geolocation `watchPosition` records lat/lng every ~3s. Distance calculated via Haversine formula. Hard to fake. |
| **Manual** | ❌ No — admin queue | User types a KM value. Appears in `/admin/runs` pending queue. Admin clicks "Approve" or "Reject". |

**Admin flow:** `/admin/runs` page shows metrics (total runners, KM verified, KM pending, bricks) + a list of pending manual entries with Approve/Reject buttons + an "Approve All" button.

---

## 10. Dashboard Components

### `/journey` page sections (top to bottom):

1. **DashboardHero** — Avatar (first letter), name, level badge, streak indicator, total KM, badge icons
2. **StatsGrid** — 3 cards: EXP points (with progress bar to next level), Bricks earned, Race countdown
3. **FitnessHub** — Two panels side by side:
   - GPS Tracker: START/STOP button, live KM display in real-time
   - Manual Log: KM input + "Add" button
4. **CommunityRank** — Top 10 leaderboard with gold/silver/bronze rank colors, "You" highlight
5. **JourneyTimeline** — Horizontal scrollable milestone cards (Day 1 → 7 → 14 → 21 → 30) with locked/unlocked state
6. **RecentRuns** — Last 10 runs with GPS/Manual icon, date, verified/pending badge

### `/admin/runs` page:

1. **AdminMetrics** — 4 stat cards: Runners, KM Verified (green), KM Pending (amber), Bricks
2. **PendingQueue** — List of unverified manual entries with Approve/Reject buttons + Approve All button

### `/journey/[id]` profile page:

1. Runner avatar, name, level badge, country, badges
2. 3 stat cards: Total KM, Bricks, Runs
3. "Support This Runner" CTA with donate button
4. Recent runs list

---

## 11. Environment Variables

Create `.env` in the project root:

```env
# Database (PostgreSQL on this VPS)
DATABASE_URL=postgresql://user:password@localhost:5432/gladyerude

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=v180y67k
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=...

# Payments
PESAPAL_CONSUMER_KEY=...
PESAPAL_CONSUMER_SECRET=...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_ENVIRONMENT=sandbox
PAYPAL_WEBHOOK_ID=...

# Analytics
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

---

## 12. Setup Instructions (for the VPS)

```bash
# 1. Pull the code
git clone git@github.com:anthonykimani/geo-foundation.git
cd geo-foundation

# 2. Create the database
sudo -u postgres psql -c "CREATE DATABASE gladyerude;"
sudo -u postgres psql -c "CREATE USER app_user WITH PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE gladyerude TO app_user;"

# 3. Run the schema
sudo -u postgres psql -d gladyerude -f supabase/migrations/vps-init.sql

# 4. Create .env with DATABASE_URL and other keys (see section 11)

# 5. Install dependencies
pnpm install

# 6. Build and start
pnpm build
pnpm start
```

The site runs on `http://localhost:3000` by default.

---

## 13. What Has Been Implemented ✅

| Feature | Status |
|---|---|
| Database schema (3 tables: brick_transactions, runners, runs) | ✅ |
| All API routes (9 endpoints) | ✅ |
| Runner registration flow | ✅ |
| Runner lookup by email or UUID | ✅ |
| GPS tracking with browser geolocation | ✅ |
| Manual run logging | ✅ |
| Admin verification queue with approve/reject | ✅ |
| Leaderboard endpoint | ✅ |
| Gamification engine (levels, badges, streaks, points, bricks) | ✅ |
| Dashboard page (`/journey`) | ✅ |
| Public runner profile (`/journey/[id]`) | ✅ |
| Admin dashboard (`/admin/runs`) | ✅ |
| Migration from Supabase to raw PostgreSQL | ✅ |

---

## 14. What Still Needs Work ⏳

| Priority | Task | Details |
|---|---|---|
| **High** | Add `/journey` to header nav | Add `{ label: "Run", href: "/journey" }` to `lib/layout-data.ts` — currently the nav links to `/run` (the event page). The dashboard needs its own nav entry. |
| **High** | Wire /run registration to API | The `/run` page registration form (`components/run/registration-form.tsx`) stores data in memory and tracks to PostHog but doesn't POST to `/api/runners` or store the runner ID. After registration, it should redirect to `/journey`. |
| **Medium** | Dashboard → public profile link | Add a link on `/journey` so runners can find and share their profile URL. |
| **Medium** | Returning runner state | Check localStorage for existing runner ID and show "Welcome back" on `/run` or redirect straight to `/journey`. |
| **Low** | Admin auth gate | `/admin/runs` is open to anyone with the URL. Add a simple password gate or shared-secret check. |
| **Low** | OG tags on public profile | `/journey/[id]` needs Open Graph tags so shared links show runner name, stats, and preview card. |
| **Low** | Social share buttons | Add share-to-Twitter/Facebook/WhatsApp buttons on the public profile. |
| **Low** | Run data migration | If old run data exists in Supabase, it needs to be exported and imported into the VPS PostgreSQL. |

---

## 15. Key Code Patterns

### Database access (`lib/db.ts`)

```ts
import { query, queryOne } from "@/lib/db";

// Multiple rows
const rows = await query("SELECT * FROM runners WHERE country = $1", ["Kenya"]);

// Single row (or null)
const runner = await queryOne("SELECT * FROM runners WHERE id = $1", [id]);

// Insert with return
const newRun = await queryOne(
  "INSERT INTO runs (runner_id, distance_km, source, verified) VALUES ($1, $2, $3, $4) RETURNING *",
  [runnerId, 5.0, "gps", true]
);
```

### Gamification utilities (`lib/journey.ts`)

```ts
import { calcBricks, calcPoints, getLevel, getStreak, aggregateStats } from "@/lib/journey";

const bricks = calcBricks(12.5); // 2
const points = calcPoints(12.5);  // 25
const level = getLevel(75);       // { name: "Active", ... }
const streak = getStreak(["2026-06-22", "2026-06-21", "2026-06-20"]); // 3
const stats = aggregateStats(runs);
// { totalKm, totalBricks, totalPoints, totalRuns, level, streak, badges }
```

### GPS Tracking (`hooks/use-gps-tracker.ts`)

```ts
const { isTracking, currentDistance, startTracking, stopTracking, error } = useGpsTracker();

// Call startTracking() to begin, stopTracking() to end and get total KM
```

---

## 16. Important Notes

1. **No authentication system.** Runner identity is managed via `localStorage` — the runner ID is stored in the browser after registration. Returning runners enter their email on `/journey` to look up their account.
2. **No ORM.** All database access uses raw SQL via `pg`. The schema is simple (3 tables, basic CRUD + aggregations), so an ORM isn't needed.
3. **The brick counter is already polling-based.** `LiveBrickCounter` component polls `/api/bricks` every 30 seconds. No WebSocket/realtime setup needed.
4. **Sanity CMS is still in use.** Page content (hero sections, text, images) comes from Sanity. Only the transactional data (donations, runners, runs) moved to PostgreSQL.
5. **The annual 5KM run event is Sept 5, 2026.** The countdown on the dashboard targets this date. Update `daysToRace` in `app/journey/page.tsx` if the date changes.
