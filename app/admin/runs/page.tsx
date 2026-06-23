"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import AdminMetrics from "@/components/admin/admin-metrics";
import PendingQueue from "@/components/admin/pending-queue";
import { trackEvent } from "@/lib/track";

interface PendingRun {
  id: string;
  distance_km: number;
  run_date: string;
  source: string;
  verified: boolean;
  created_at: string;
  runners: {
    name: string;
    email: string;
    country: string;
  };
}

interface AllRun extends PendingRun {
  runner_id: string;
}

function AdminRunsPage() {
  const [metrics, setMetrics] = useState({
    totalRunners: 0,
    totalKmVerified: 0,
    totalKmPending: 0,
    totalBricks: 0,
  });
  const [pendingRuns, setPendingRuns] = useState<PendingRun[]>([]);
  const [allRuns, setAllRuns] = useState<AllRun[]>([]);
  const [filter, setFilter] = useState<"all" | "verified" | "pending">("all");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [pendingRes, runnersRes] = await Promise.all([
        fetch("/api/runs/pending"),
        fetch("/api/runners/leaderboard"),
      ]);

      const pending: PendingRun[] = await pendingRes.json();
      const leaderboard = await runnersRes.json();

      const totalRunners = Array.isArray(leaderboard) ? leaderboard.length : 0;
      const totalKmVerified = (Array.isArray(leaderboard) ? leaderboard : []).reduce(
        (sum: number, r: any) => sum + (r.totalKm || 0),
        0
      );
      const totalKmPending = (Array.isArray(pending) ? pending : []).reduce(
        (sum: number, r: any) => sum + (r.distance_km || 0),
        0
      );
      const totalBricks = (Array.isArray(leaderboard) ? leaderboard : []).reduce(
        (sum: number, r: any) => sum + (r.totalBricks || 0),
        0
      );

      setMetrics({ totalRunners, totalKmVerified, totalKmPending, totalBricks });
      setPendingRuns(Array.isArray(pending) ? pending : []);
      setAllRuns([]);
    } catch (e) {
      console.error("Failed to load admin data", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleApprove = async (ids: string[]) => {
    setActionLoading(true);
    trackEvent("admin_approve_runs", { count: ids.length });
    try {
      await fetch("/api/runs/verify", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ run_ids: ids }),
      });
      await loadData();
    } catch (e) {
      console.error("Failed to approve runs", e);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(true);
    trackEvent("admin_reject_run", { runId: id });
    try {
      await fetch(`/api/runs/reject?id=${id}`, { method: "DELETE" });
      await loadData();
    } catch (e) {
      console.error("Failed to reject run", e);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 rounded bg-muted" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 rounded-2xl bg-muted" />
              ))}
            </div>
            <div className="h-64 rounded-2xl bg-muted" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-1">
            Mission Control
          </h1>
          <p className="text-muted-foreground">
            Manage the Brick Conversion Engine.
          </p>
        </motion.div>

        <AdminMetrics
          totalRunners={metrics.totalRunners}
          totalKmVerified={metrics.totalKmVerified}
          totalKmPending={metrics.totalKmPending}
          totalBricks={metrics.totalBricks}
        />

        <PendingQueue
          runs={pendingRuns}
          onApprove={handleApprove}
          onReject={handleReject}
          loading={actionLoading}
        />
      </div>
    </main>
  );
}

export default AdminRunsPage;
