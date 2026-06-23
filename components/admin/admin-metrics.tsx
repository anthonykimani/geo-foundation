"use client";

interface AdminMetricsProps {
  totalRunners: number;
  totalKmVerified: number;
  totalKmPending: number;
  totalBricks: number;
}

function AdminMetrics({ totalRunners, totalKmVerified, totalKmPending, totalBricks }: AdminMetricsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="rounded-2xl bg-card border border-border p-4">
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">
          Runners
        </p>
        <p className="text-3xl font-bold text-foreground">{totalRunners}</p>
      </div>
      <div className="rounded-2xl bg-card border border-border p-4">
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">
          KM Verified
        </p>
        <p className="text-3xl font-bold text-emerald-500">
          {totalKmVerified.toFixed(1)}
        </p>
      </div>
      <div className="rounded-2xl bg-card border border-border p-4">
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">
          KM Pending
        </p>
        <p className="text-3xl font-bold text-amber-500">
          {totalKmPending.toFixed(1)}
        </p>
      </div>
      <div className="rounded-2xl bg-card border border-border p-4">
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">
          Bricks from Runs
        </p>
        <p className="text-3xl font-bold text-foreground">{totalBricks}</p>
      </div>
    </div>
  );
}

export default AdminMetrics;
