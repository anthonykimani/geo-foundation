# VPS Setup Prompt

Copy and paste this into the opencode instance on your Contabo VPS to set up the database.

---

I need to set up the PostgreSQL database for a Next.js application called "erude". Here's what needs to happen:

## 1. Create the Database

Run these commands on the VPS (as postgres user or via sudo):

```bash
sudo -u postgres psql -c "CREATE DATABASE gladyerude;"
sudo -u postgres psql -c "CREATE USER app_user WITH PASSWORD 'your_secure_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE gladyerude TO app_user;"
```

## 2. Create the Schema

Run the `supabase/migrations/vps-init.sql` file:

```bash
sudo -u postgres psql -d gladyerude -f /path/to/erude/supabase/migrations/vps-init.sql
```

Or copy and execute this in the psql shell:

```sql
-- Brick transactions table (core donation tracking)
CREATE TABLE IF NOT EXISTS brick_transactions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  donor_name TEXT,
  donor_email TEXT,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD' CHECK (currency IN ('USD', 'KES')),
  bricks INT GENERATED ALWAYS AS (
    CASE WHEN currency = 'USD' THEN FLOOR(amount)::INT
         WHEN currency = 'KES' THEN FLOOR(amount / 130)::INT
    END
  ) STORED,
  payment_method TEXT CHECK (payment_method IN ('pesapal', 'paypal', 'gofundme', 'manual', 'run')),
  payment_ref TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bricks_status ON brick_transactions(status);
CREATE INDEX IF NOT EXISTS idx_bricks_created ON brick_transactions(created_at DESC);

-- Runners table (registered run/walk participants)
CREATE TABLE IF NOT EXISTS runners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  country TEXT DEFAULT 'Kenya',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Runs table (logged run/walk activities)
CREATE TABLE IF NOT EXISTS runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  runner_id UUID REFERENCES runners(id),
  distance_km NUMERIC NOT NULL,
  run_date DATE DEFAULT CURRENT_DATE,
  verified BOOLEAN DEFAULT false,
  source TEXT DEFAULT 'manual' CHECK (source IN ('gps', 'manual')),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 3. Update .env on the VPS

Set `DATABASE_URL` in the environment:

```
DATABASE_URL=postgresql://app_user:your_secure_password@localhost:5432/gladyerude
```

## 4. Install Dependencies

The codebase uses `pg` (node-postgres) for database access. No ORM layer.

```bash
pnpm install
```

## 5. Build & Start

```bash
pnpm build
pnpm start
```
