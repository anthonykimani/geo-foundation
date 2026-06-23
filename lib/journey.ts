export type Level = "Beginner" | "Active" | "Runner" | "Champion";

export interface LevelConfig {
  name: Level;
  minPoints: number;
  color: string;
  badgeClass: string;
}

export const LEVELS: LevelConfig[] = [
  { name: "Beginner", minPoints: 0, color: "#6b7280", badgeClass: "level-beginner" },
  { name: "Active", minPoints: 51, color: "#3b82f6", badgeClass: "level-active" },
  { name: "Runner", minPoints: 151, color: "#8b5cf6", badgeClass: "level-runner" },
  { name: "Champion", minPoints: 301, color: "#f59e0b", badgeClass: "level-champion" },
];

export const BADGES: Record<string, { name: string; icon: string }> = {
  FIRST_RUN: { name: "First Steps", icon: "🏅" },
  KM_5: { name: "5KM Captain", icon: "🏆" },
  BRICK_MASTER: { name: "Mason 101", icon: "🧱" },
  STREAK_3: { name: "Fire Starter", icon: "🔥" },
  CHAMPION: { name: "Champion Runner", icon: "👑" },
};

export const KM_PER_BRICK = 5;
export const POINTS_PER_KM = 2;

export function calcBricks(distanceKm: number): number {
  return Math.floor(distanceKm / KM_PER_BRICK);
}

export function calcPoints(distanceKm: number): number {
  return Math.floor(distanceKm * POINTS_PER_KM);
}

export function getLevel(totalPoints: number): LevelConfig {
  let level = LEVELS[0];
  for (const l of LEVELS) {
    if (totalPoints >= l.minPoints) level = l;
  }
  return level;
}

export function getStreak(runDates: string[]): number {
  if (!runDates.length) return 0;

  const unique = [...new Set(runDates)].sort().reverse();
  let streak = 0;
  const today = new Date();
  let checkDate = new Date(today);

  for (const dateStr of unique) {
    const date = new Date(dateStr);
    const diff = Math.round(
      (checkDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diff === streak) {
      streak++;
    } else if (diff > streak) {
      break;
    }
  }

  return streak;
}

export function getUnlockedBadges(props: {
  totalKm: number;
  totalBricks: number;
  streak: number;
  level: Level;
}): string[] {
  const unlocked: string[] = [];

  if (props.totalKm > 0) unlocked.push("FIRST_RUN");
  if (props.totalKm >= 5) unlocked.push("KM_5");
  if (props.totalBricks >= 10) unlocked.push("BRICK_MASTER");
  if (props.streak >= 3) unlocked.push("STREAK_3");
  if (props.level === "Champion") unlocked.push("CHAMPION");

  return unlocked;
}

export interface RunnerStats {
  totalKm: number;
  totalBricks: number;
  totalPoints: number;
  totalRuns: number;
  level: LevelConfig;
  streak: number;
  badges: string[];
}

export function aggregateStats(runs: { distance_km: number; run_date: string }[]): RunnerStats {
  const totalKm = runs.reduce((sum, r) => sum + r.distance_km, 0);
  const totalBricks = calcBricks(totalKm);
  const totalPoints = calcPoints(totalKm);
  const totalRuns = runs.length;
  const level = getLevel(totalPoints);
  const runDates = runs.map((r) => r.run_date);
  const streak = getStreak(runDates);
  const badges = getUnlockedBadges({ totalKm, totalBricks, streak, level: level.name });

  return { totalKm, totalBricks, totalPoints, totalRuns, level, streak, badges };
}
