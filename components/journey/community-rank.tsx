"use client";

import { useEffect, useState } from "react";

interface LeaderEntry {
  id: string;
  name: string;
  country: string;
  totalKm: number;
  totalBricks: number;
  totalRuns: number;
}

function CommunityRank({ currentRunnerId }: { currentRunnerId?: string }) {
  const [leaders, setLeaders] = useState<LeaderEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/runners/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setLeaders(Array.isArray(data) ? data : []);
      })
      .catch(() => setLeaders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl bg-card border border-border p-5">
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4">
          Community Rank
        </p>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4">
        Community Rank
      </p>
      <div className="space-y-1">
        {leaders.slice(0, 10).map((runner, i) => {
          const isUser = runner.id === currentRunnerId;
          return (
            <div
              key={runner.id}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm ${
                isUser
                  ? "bg-primary/10 border border-primary/30"
                  : "hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-5 text-center text-xs font-bold shrink-0 ${
                    i === 0
                      ? "text-amber-500"
                      : i === 1
                        ? "text-slate-400"
                        : i === 2
                          ? "text-amber-700"
                          : "text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="truncate font-medium text-foreground">
                  {runner.name}
                </span>
                {isUser && (
                  <span className="text-[10px] font-bold text-primary uppercase shrink-0">
                    You
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs text-muted-foreground">
                  {runner.totalKm.toFixed(1)} km
                </span>
                <span className="text-xs font-bold text-emerald-500">
                  {runner.totalBricks} 🧱
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {leaders.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-6">
          No runners yet. Be the first!
        </p>
      )}
    </div>
  );
}

export default CommunityRank;
