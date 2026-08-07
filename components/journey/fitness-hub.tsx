"use client";

import GpsTracker from "./gps-tracker";

interface FitnessHubProps {
  onGpsComplete: (distanceKm: number) => void;
  disabled?: boolean;
  totalKm: number;
}

function FitnessHub({ onGpsComplete, disabled, totalKm }: FitnessHubProps) {
  return (
    <div className="rounded-2xl bg-card border border-border p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <h2 className="text-lg font-bold text-foreground">Fitness Hub</h2>
        <span className="text-sm font-bold text-emerald-500">
          {totalKm.toFixed(1)} KM TOTAL
        </span>
      </div>

      <div className="max-w-xl">
        <GpsTracker onRunComplete={onGpsComplete} disabled={disabled} />
      </div>
    </div>
  );
}

export default FitnessHub;
