"use client";

import { useGpsTracker } from "@/hooks/use-gps-tracker";
import { Button } from "@/components/ui/button";

interface GpsTrackerProps {
  onRunComplete: (distanceKm: number) => void;
  disabled?: boolean;
}

function GpsTracker({ onRunComplete, disabled }: GpsTrackerProps) {
  const { isTracking, currentDistance, startTracking, stopTracking, error, paused } =
    useGpsTracker();

  const handleStop = () => {
    const dist = stopTracking();
    if (dist > 0) {
      onRunComplete(dist);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-foreground font-mono tabular-nums">
          {currentDistance.toFixed(2)}
        </span>
        <span className="text-sm text-muted-foreground">KM tracked</span>
      </div>

      {paused && (
        <p className="text-sm text-amber-500">
          Tracking paused — unlock your screen to continue.
        </p>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button
        onClick={isTracking ? handleStop : startTracking}
        disabled={disabled}
        className={`h-12 text-base font-bold w-full sm:w-auto ${
          isTracking
            ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            : ""
        }`}
      >
        {isTracking ? "STOP GPS RUN" : "START GPS RUN"}
      </Button>
    </div>
  );
}

export default GpsTracker;
