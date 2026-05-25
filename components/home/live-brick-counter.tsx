"use client";

import { useEffect, useState } from "react";

interface BricksData {
  total: number;
  live: number;
  sanity: number;
}

function LiveBrickCounter() {
  const [bricks, setBricks] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchBricks() {
      try {
        const res = await fetch("/api/bricks");
        const data: BricksData = await res.json();
        if (!cancelled) {
          setBricks(data.total);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    fetchBricks();
    const interval = setInterval(fetchBricks, 30000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (bricks === null && !error) {
    return (
      <div className="text-center">
        <span className="text-4xl font-bold text-foreground">...</span>
        <p className="text-sm text-muted-foreground mt-1">Bricks Deployed</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <span className="text-4xl font-bold text-foreground">—</span>
        <p className="text-sm text-muted-foreground mt-1">Bricks Deployed</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <span className="text-4xl font-bold text-foreground">
        {bricks?.toLocaleString() ?? "—"}
      </span>
      <p className="text-sm text-muted-foreground mt-1">Bricks Deployed</p>
    </div>
  );
}

export default LiveBrickCounter;
