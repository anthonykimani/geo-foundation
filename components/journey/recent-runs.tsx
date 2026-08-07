"use client";

interface RunEntry {
  id: string;
  distance_km: number;
  run_date: string;
  source: string;
  verified: boolean;
  created_at: string;
}

function RecentRuns({ runs }: { runs: RunEntry[] }) {
  if (runs.length === 0) {
    return (
      <div className="rounded-2xl bg-card border border-border p-5">
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4">
          Recent Runs
        </p>
        <p className="text-sm text-muted-foreground text-center py-6">
          No runs logged yet. Start tracking above!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4">
        Recent Runs
      </p>
      <div className="space-y-2">
        {runs.slice(0, 10).map((run) => (
          <div
            key={run.id}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🛰️</span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {run.distance_km.toFixed(1)} km
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(run.run_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500">
              Verified
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentRuns;
