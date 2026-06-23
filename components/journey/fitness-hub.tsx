"use client";

import GpsTracker from "./gps-tracker";
import ManualLog from "./manual-log";

interface FitnessHubProps {
  onGpsComplete: (distanceKm: number) => void;
  onManualLog: (distanceKm: number) => void;
  disabled?: boolean;
  totalKm: number;
}

function FitnessHub({ onGpsComplete, onManualLog, disabled, totalKm }: FitnessHubProps) {
  return (
    <div className="rounded-2xl bg-card border border-border p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <h2 className="text-lg font-bold text-foreground">Fitness Hub</h2>
        <span className="text-sm font-bold text-emerald-500">
          {totalKm.toFixed(1)} KM TOTAL
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <GpsTracker onRunComplete={onGpsComplete} disabled={disabled} />
        </div>

        <div className="hidden md:block w-px bg-border" />

        <div className="space-y-4">
          <ManualLog onLog={onManualLog} disabled={disabled} />
        </div>
      </div>
    </div>
  );
}

export default FitnessHub;
