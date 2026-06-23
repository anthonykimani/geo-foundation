"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import LevelBadge from "@/components/journey/level-badge";
import BadgeDisplay from "@/components/journey/badge-display";
import type { RunnerStats } from "@/lib/journey";

function PublicProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [runner, setRunner] = useState<any>(null);
  const [stats, setStats] = useState<RunnerStats | null>(null);
  const [recentRuns, setRecentRuns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/runners/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Runner not found");
        return res.json();
      })
      .then((data) => {
        setRunner(data.runner);
        setStats(data.stats);
        setRecentRuns(data.recentRuns || []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <div className="animate-pulse space-y-6 max-w-xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-muted" />
              <div className="space-y-2">
                <div className="h-6 w-40 rounded bg-muted" />
                <div className="h-4 w-24 rounded bg-muted" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-2xl bg-muted" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !runner) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Runner Not Found</h1>
          <p className="text-muted-foreground">This runner profile doesn&apos;t exist.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground shrink-0">
              {runner.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {runner.name}
                </h1>
                {stats && <LevelBadge level={stats.level.name} />}
              </div>
              {runner.country && (
                <p className="text-sm text-muted-foreground mt-1">{runner.country}</p>
              )}
              {stats && (
                <div className="mt-2">
                  <BadgeDisplay unlocked={stats.badges} />
                </div>
              )}
            </div>
          </div>

          {stats && (
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-card border border-border p-4 text-center">
                <p className="text-2xl font-bold text-foreground">
                  {stats.totalKm.toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                  Total KM
                </p>
              </div>
              <div className="rounded-2xl bg-card border border-border p-4 text-center">
                <p className="text-2xl font-bold text-emerald-500">
                  {stats.totalBricks}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                  Bricks
                </p>
              </div>
              <div className="rounded-2xl bg-card border border-border p-4 text-center">
                <p className="text-2xl font-bold text-foreground">
                  {stats.totalRuns}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                  Runs
                </p>
              </div>
            </div>
          )}

          <div className="rounded-2xl bg-card border border-border p-6 text-center">
            <h3 className="text-lg font-bold text-foreground mb-2">
              Support {runner.name.split(" ")[0]}&apos;s Journey
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Every 5KM run builds one brick toward a classroom in Kilifi.
              Help turn their effort into education.
            </p>
            <Button className="h-12 px-8 text-base font-bold">
              Donate a Brick
            </Button>
          </div>

          {recentRuns.length > 0 && (
            <div className="rounded-2xl bg-card border border-border p-5">
              <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4">
                Recent Runs
              </h3>
              <div className="space-y-2">
                {recentRuns.map((run: any) => (
                  <div
                    key={run.id || run.created_at}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <span>{run.source === "gps" ? "🛰️" : "✍️"}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {run.distance_km.toFixed(1)} km
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(run.run_date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        run.verified
                          ? "bg-emerald-500/20 text-emerald-500"
                          : "bg-amber-500/20 text-amber-500"
                      }`}
                    >
                      {run.verified ? "Verified" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}

export default PublicProfilePage;
