"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  totalDistance,
  isPlausibleTrackPoint,
  type TrackPoint,
} from "@/lib/gps";

const STORAGE_KEY = "geo_active_run";

interface StoredRun {
  coords: TrackPoint[];
  tracking: boolean;
}

interface UseGpsTrackerReturn {
  isTracking: boolean;
  currentDistance: number;
  startTracking: () => void;
  stopTracking: () => number;
  error: string | null;
  paused: boolean;
}

function persistRun(coords: TrackPoint[]) {
  const payload: StoredRun = { coords, tracking: true };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* storage unavailable */
  }
}

function clearStoredRun() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
}

function readStoredRun(): StoredRun | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredRun;
    if (!Array.isArray(parsed.coords)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function useGpsTracker(): UseGpsTrackerReturn {
  const [isTracking, setIsTracking] = useState(false);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const coordsRef = useRef<TrackPoint[]>([]);
  const watchIdRef = useRef<number | null>(null);
  const wakeLockRef = useRef<{ release: () => Promise<void> } | null>(null);
  const distanceRef = useRef(0);

  const setDistance = useCallback((value: number) => {
    distanceRef.current = value;
    setCurrentDistance(value);
  }, []);

  const releaseWakeLock = useCallback(() => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release().catch(() => {});
      wakeLockRef.current = null;
    }
  }, []);

  const requestWakeLock = useCallback(async () => {
    try {
      const nav = navigator as Navigator & {
        wakeLock?: { request: (type: "screen") => Promise<{ release: () => Promise<void> }> };
      };
      if (!nav.wakeLock) return;
      releaseWakeLock();
      wakeLockRef.current = await nav.wakeLock.request("screen");
    } catch {
      /* wake lock unsupported or denied — fall back to graceful pause */
    }
  }, [releaseWakeLock]);

  const watchPosition = useCallback(
    (coords: TrackPoint[]) => {
      if (!navigator.geolocation || watchIdRef.current !== null) return;
      setError(null);
      setPaused(false);

      const id = navigator.geolocation.watchPosition(
        (pos) => {
          const point: TrackPoint = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            ts: Date.now(),
            accuracy: pos.coords.accuracy,
          };
          const prev = coords.length ? coords[coords.length - 1] : null;
          if (!isPlausibleTrackPoint(prev, point)) return;
          coords.push(point);
          setDistance(totalDistance(coords));
          persistRun(coords);
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            setError("Location permission was denied. Enable GPS access to track runs.");
          }
        },
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
      );
      watchIdRef.current = id;
    },
    [setDistance]
  );

  const clearWatch = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setError("GPS is not available on this device");
      return;
    }

    setError(null);
    setPaused(false);
    clearWatch();
    coordsRef.current = [];
    setDistance(0);
    clearStoredRun();

    watchPosition(coordsRef.current);
    requestWakeLock();
    setIsTracking(true);
  }, [watchPosition, requestWakeLock, clearWatch, setDistance]);

  const stopTracking = useCallback((): number => {
    clearWatch();
    releaseWakeLock();
    clearStoredRun();
    setIsTracking(false);
    setPaused(false);
    return distanceRef.current;
  }, [clearWatch, releaseWakeLock]);

  useEffect(() => {
    if (!isTracking) return;

    const handleVisibility = () => {
      if (document.hidden) {
        setPaused(true);
        persistRun(coordsRef.current);
      } else {
        requestWakeLock();
        watchPosition(coordsRef.current);
        setPaused(false);
      }
    };

    const handlePageHide = () => {
      persistRun(coordsRef.current);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [isTracking, watchPosition, requestWakeLock]);

  useEffect(() => {
    const handlePageShow = () => {
      if (isTracking || watchIdRef.current !== null) return;
      const stored = readStoredRun();
      if (!stored || !stored.tracking || !stored.coords.length) return;

      coordsRef.current = stored.coords;
      setDistance(totalDistance(stored.coords));
      clearStoredRun();
      watchPosition(coordsRef.current);
      requestWakeLock();
      setIsTracking(true);
      setPaused(false);
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [isTracking, watchPosition, requestWakeLock, setDistance]);

  useEffect(() => {
    return () => {
      clearWatch();
      releaseWakeLock();
    };
  }, [clearWatch, releaseWakeLock]);

  return { isTracking, currentDistance, startTracking, stopTracking, error, paused };
}
