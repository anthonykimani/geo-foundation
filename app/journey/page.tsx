"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/track";
import DashboardHero from "@/components/journey/dashboard-hero";
import StatsGrid from "@/components/journey/stats-grid";
import FitnessHub from "@/components/journey/fitness-hub";
import CommunityRank from "@/components/journey/community-rank";
import JourneyTimeline from "@/components/journey/journey-timeline";
import RecentRuns from "@/components/journey/recent-runs";
import type { RunnerStats } from "@/lib/journey";
import { LEVELS } from "@/lib/journey";

interface RunnerData {
  id: string;
  name: string;
  email: string;
  country: string;
  avatar_url?: string;
}

function JourneyPage() {
  const { data: session, status } = useSession();
  const [runner, setRunner] = useState<RunnerData | null>(null);
  const [stats, setStats] = useState<RunnerStats | null>(null);
  const [runs, setRuns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRunner = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/runners/me");
      if (!res.ok) {
        if (res.status === 401) {
          setRunner(null);
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
    if (status === "authenticated") {
      loadRunner();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, loadRunner]);

  const handleGpsComplete = async (distanceKm: number) => {
    if (!session?.runner_id) return;
    trackEvent("journey_gps_run", { distanceKm });
    const res = await fetch("/api/runs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ runner_id: session.runner_id, distance_km: distanceKm, source: "gps" }),
    });
    if (res.ok) loadRunner();
  };

  const handleManualLog = async (distanceKm: number) => {
    if (!session?.runner_id) return;
    trackEvent("journey_manual_run", { distanceKm });
    const res = await fetch("/api/runs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ runner_id: session.runner_id, distance_km: distanceKm, source: "manual" }),
    });
    if (res.ok) loadRunner();
  };

  if (loading || status === "loading") {
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

  if (!session || !runner) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Your Journey Starts Here
            </h1>
            <p className="text-muted-foreground mb-8">
              Sign in with Google to start tracking your runs and earning bricks.
            </p>

            <Button
              onClick={() => {
                signIn("google", { redirectTo: "/journey" });
                trackEvent("journey_sign_in_click");
              }}
              className="w-full h-14 text-base font-bold gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>
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
          <CommunityRank currentRunnerId={session.runner_id} />
          <JourneyTimeline currentDay={stats?.streak || 0} />
        </div>

        <RecentRuns runs={runs} />
      </div>
    </main>
  );
}

export default JourneyPage;
