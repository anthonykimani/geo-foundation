import { query } from "@/lib/db";

export async function GET() {
  try {
    const rows = await query<{
      id: string;
      name: string;
      country: string;
      total_km: number;
      total_runs: number;
    }>(
      `SELECT 
        r.id, r.name, r.country,
        COALESCE(SUM(ru.distance_km)::float, 0) as total_km,
        COUNT(ru.id)::int as total_runs
      FROM runners r
      LEFT JOIN runs ru ON ru.runner_id = r.id
      GROUP BY r.id, r.name, r.country
      ORDER BY total_km DESC
      LIMIT 20`
    );

    const leaderboard = rows.map((r) => ({
      id: r.id,
      name: r.name,
      country: r.country,
      totalKm: r.total_km,
      totalBricks: Math.floor(r.total_km / 5),
      totalRuns: r.total_runs,
    }));

    return Response.json(leaderboard);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
