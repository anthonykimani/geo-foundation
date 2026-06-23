"use client";

import { Button } from "@/components/ui/button";

interface PendingRun {
  id: string;
  distance_km: number;
  run_date: string;
  source: string;
  created_at: string;
  runners: {
    name: string;
    email: string;
    country: string;
  };
}

interface PendingQueueProps {
  runs: PendingRun[];
  onApprove: (ids: string[]) => void;
  onReject: (id: string) => void;
  loading: boolean;
}

function PendingQueue({ runs, onApprove, onReject, loading }: PendingQueueProps) {
  if (runs.length === 0) {
    return (
      <div className="rounded-2xl bg-card border border-border p-6">
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4">
          Pending Approvals
        </p>
        <p className="text-sm text-muted-foreground text-center py-6">
          No pending manual entries. All clear!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
          Pending Approvals
        </p>
        <Button
          onClick={() => onApprove(runs.map((r) => r.id))}
          disabled={loading}
          size="sm"
          className="font-bold"
        >
          Approve All
        </Button>
      </div>
      <div className="space-y-2">
        {runs.map((run) => (
          <div
            key={run.id}
            className="flex items-center justify-between py-3 px-4 rounded-lg bg-muted/30"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">
                {run.runners?.name || "Unknown"}
              </p>
              <p className="text-xs text-muted-foreground">
                {run.distance_km.toFixed(1)} km on{" "}
                {new Date(run.run_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                {run.runners?.email && ` · ${run.runners.email}`}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <Button
                onClick={() => onApprove([run.id])}
                disabled={loading}
                size="sm"
                variant="default"
              >
                Approve
              </Button>
              <Button
                onClick={() => onReject(run.id)}
                disabled={loading}
                size="sm"
                variant="destructive"
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PendingQueue;
