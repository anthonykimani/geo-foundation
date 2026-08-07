export interface GeoCoord {
  lat: number;
  lng: number;
}

export interface TrackPoint extends GeoCoord {
  ts: number;
  accuracy?: number;
}

export const MAX_POINT_ACCURACY_M = 100;
export const MAX_SPEED_KMH = 45;

export function haversineDistance(a: GeoCoord, b: GeoCoord): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const aVal =
    sinLat * sinLat +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      sinLng * sinLng;
  return R * 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));
}

export function totalDistance(coords: GeoCoord[]): number {
  let total = 0;
  for (let i = 1; i < coords.length; i++) {
    total += haversineDistance(coords[i - 1], coords[i]);
  }
  return total;
}

export function isPlausibleTrackPoint(prev: TrackPoint | null, next: TrackPoint): boolean {
  if (next.accuracy != null && next.accuracy > MAX_POINT_ACCURACY_M) return false;
  if (!prev) return true;

  const distKm = haversineDistance(
    { lat: prev.lat, lng: prev.lng },
    { lat: next.lat, lng: next.lng }
  );
  const dtHours = (next.ts - prev.ts) / (1000 * 60 * 60);
  if (dtHours <= 0) return distKm < 0.001;
  return distKm / dtHours <= MAX_SPEED_KMH;
}
