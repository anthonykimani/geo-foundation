"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackEvent } from "@/lib/track";
import DashboardHero from "@/components/journey/dashboard-hero";
import StatsGrid from "@/components/journey/stats-grid";
import FitnessHub from "@/components/journey/fitness-hub";
import CommunityRank from "@/components/journey/community-rank";
import JourneyTimeline from "@/components/journey/journey-timeline";
import RecentRuns from "@/components/journey/recent-runs";
import type { Level, RunnerStats } from "@/lib/journey";
import { LEVELS } from "@/lib/journey";

function getStoredRunnerId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("geo_runner_id");
}

function storeRunnerId(id: string) {
  localStorage.setItem("geo_runner_id", id);
}

interface RunnerData {
  id: string;
  name: string;
  email: string;
  country: string;
}

function JourneyPage() {
  const [runnerId, setRunnerId] = useState<string | null>(null);
  const [runner, setRunner] = useState<RunnerData | null>(null);
  const [stats, setStats] = useState<RunnerStats | null>(null);
  const [runs, setRuns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const loadRunner = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/runners/${id}`);
      if (!res.ok) {
        if (res.status === 404) {
          localStorage.removeItem("geo_runner_id");
          setRunnerId(null);
          setRunner(null);
          setStats(null);
          setRuns([]);
          return;
        }
        throw new Error("Failed to load runner data");
      }
      const data = await res.json();
      setRunner(data.runner);
      setStats(data.stats);
      setRuns(data.recentRuns || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = getStoredRunnerId();
    if (id) {
      setRunnerId(id);
      loadRunner(id);
    } else {
      setLoading(false);
    }
  }, [loadRunner]);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLookupLoading(true);
    setLookupError(null);
    try {
      const res = await fetch(`/api/runners/${email}`);
      if (!res.ok) {
        if (res.status === 404) {
          setLookupError("No runner found with this email. Register below.");
          return;
        }
        throw new Error("Lookup failed");
      }
      const data = await res.json();
      storeRunnerId(data.runner.id);
      setRunnerId(data.runner.id);
      setRunner(data.runner);
      setStats(data.stats);
      setRuns(data.recentRuns || []);
      trackEvent("journey_runner_lookup", { runnerId: data.runner.id });
    } catch (e: any) {
      setLookupError(e.message);
    } finally {
      setLookupLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail) return;
    setRegisterLoading(true);
    setRegisterError(null);
    try {
      const res = await fetch("/api/runners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          country: "Kenya",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setRegisterError(data.error || "Registration failed");
        return;
      }
      const data = await res.json();
      storeRunnerId(data.id);
      setRunnerId(data.id);
      setRunner({ id: data.id, name: data.name, email: data.email, country: data.country });
      setStats({
        totalKm: 0,
        totalBricks: 0,
        totalPoints: 0,
        totalRuns: 0,
        level: LEVELS[0],
        streak: 0,
        badges: [],
      });
      setRuns([]);
      trackEvent("journey_register", { runnerId: data.id });
    } catch (e: any) {
      setRegisterError(e.message);
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleGpsComplete = async (distanceKm: number) => {
    if (!runnerId) return;
    trackEvent("journey_gps_run", { distanceKm });
    const res = await fetch("/api/runs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ runner_id: runnerId, distance_km: distanceKm, source: "gps" }),
    });
    if (res.ok) {
      loadRunner(runnerId);
    }
  };

  const handleManualLog = async (distanceKm: number) => {
    if (!runnerId) return;
    trackEvent("journey_manual_run", { distanceKm });
    const res = await fetch("/api/runs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ runner_id: runnerId, distance_km: distanceKm, source: "manual" }),
    });
    if (res.ok) {
      loadRunner(runnerId);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <div className="space-y-6 animate-pulse">
            <div className="h-16 w-64 rounded-lg bg-muted" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 rounded-2xl bg-muted" />
              ))}
            </div>
            <div className="h-48 rounded-2xl bg-muted" />
          </div>
        </div>
      </main>
    );
  }

  if (!runnerId || !runner) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Your Journey Starts Here
            </h1>
            <p className="text-muted-foreground mb-8">
              Already registered? Look up your account. New here? Sign up to start tracking.
            </p>

            <div className="rounded-2xl bg-card border border-border p-6 mb-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Already a Runner?</h2>
              <form onSubmit={handleLookup} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 text-lg"
                />
                {lookupError && (
                  <p className="text-sm text-destructive">{lookupError}</p>
                )}
                <Button type="submit" disabled={lookupLoading || !email} className="w-full h-12 text-base font-bold">
                  {lookupLoading ? "Looking up..." : "Find My Dashboard"}
                </Button>
              </form>
            </div>

            <div className="rounded-2xl bg-card border border-border p-6">
              <h2 className="text-lg font-bold text-foreground mb-1">New Runner</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Register to start tracking your runs and earning bricks.
              </p>
              <form onSubmit={handleRegister} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                  className="h-12 text-lg"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                  className="h-12 text-lg"
                />
                {registerError && (
                  <p className="text-sm text-destructive">{registerError}</p>
                )}
                <Button type="submit" disabled={registerLoading || !registerName || !registerEmail} className="w-full h-12 text-base font-bold">
                  {registerLoading ? "Registering..." : "Start My Journey"}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  const daysToRace = (() => {
    const raceDate = new Date("2026-09-05");
    const diff = Math.ceil(
      (raceDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(0, diff);
  })();

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto space-y-6">
        <DashboardHero
          name={runner.name}
          level={stats?.level.name || "Beginner"}
          streak={stats?.streak || 0}
          totalKm={stats?.totalKm || 0}
          badges={stats?.badges || []}
        />

        <StatsGrid
          points={stats?.totalPoints || 0}
          nextLevelPoints={(() => {
            const currentLevel = stats?.level;
            if (!currentLevel) return 100;
            const idx = LEVELS.findIndex((l) => l.name === currentLevel.name);
            const next = LEVELS[idx + 1];
            return next ? next.minPoints - currentLevel.minPoints : 1;
          })()}
          bricks={stats?.totalBricks || 0}
          daysToRace={daysToRace}
        />

        <FitnessHub
          onGpsComplete={handleGpsComplete}
          onManualLog={handleManualLog}
          totalKm={stats?.totalKm || 0}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CommunityRank currentRunnerId={runnerId} />
          <JourneyTimeline currentDay={stats?.streak || 0} />
        </div>

        <RecentRuns runs={runs} />
      </div>
    </main>
  );
}

export default JourneyPage;
