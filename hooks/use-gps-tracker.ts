"use client";

import { useState, useRef, useCallback } from "react";
import { totalDistance, type GeoCoord } from "@/lib/gps";

interface UseGpsTrackerReturn {
  isTracking: boolean;
  currentDistance: number;
  startTracking: () => void;
  stopTracking: () => number;
  error: string | null;
}

export function useGpsTracker(): UseGpsTrackerReturn {
  const [isTracking, setIsTracking] = useState(false);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const coordsRef = useRef<GeoCoord[]>([]);
  const watchIdRef = useRef<number | null>(null);

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setError("GPS is not available on this device");
      return;
    }

    setError(null);
    coordsRef.current = [];
    setCurrentDistance(0);

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const coord: GeoCoord = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        coordsRef.current.push(coord);
        setCurrentDistance(totalDistance(coordsRef.current));
      },
      (err) => {
        setError(err.message);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    watchIdRef.current = id;
    setIsTracking(true);
  }, []);

  const stopTracking = useCallback((): number => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
    return currentDistance;
  }, [currentDistance]);

  return { isTracking, currentDistance, startTracking, stopTracking, error };
}
