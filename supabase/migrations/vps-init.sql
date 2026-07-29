-- VPS PostgreSQL Setup for Gladys Erude Organization
-- Run this once to initialize the database
-- psql -U postgres -d gladyerude -f vps-init.sql

-- Core brick transactions table
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

-- Runner tables
CREATE TABLE IF NOT EXISTS runners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  country TEXT DEFAULT 'Kenya',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  runner_id UUID REFERENCES runners(id),
  distance_km NUMERIC NOT NULL,
  run_date DATE DEFAULT CURRENT_DATE,
  verified BOOLEAN DEFAULT false,
  source TEXT DEFAULT 'manual' CHECK (source IN ('gps', 'manual')),
  created_at TIMESTAMPTZ DEFAULT now()
);
