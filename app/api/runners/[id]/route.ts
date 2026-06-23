import { query, queryOne } from "@/lib/db";
import { aggregateStats } from "@/lib/journey";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const column = UUID_RE.test(id) ? "id" : "email";

    const runner = await queryOne<{
      id: string;
      name: string;
      email: string;
      country: string;
      created_at: string;
    }>(`SELECT * FROM runners WHERE ${column} = $1`, [id]);

    if (!runner) {
      return Response.json({ error: "Runner not found" }, { status: 404 });
    }

    const runs = await query<{
      distance_km: number;
      run_date: string;
      verified: boolean;
      source: string;
      created_at: string;
    }>(
      "SELECT distance_km, run_date, verified, source, created_at FROM runs WHERE runner_id = $1 ORDER BY created_at DESC",
      [runner.id]
    );

    const stats = aggregateStats(runs);

    return Response.json({
      runner,
      stats,
      recentRuns: runs.slice(0, 10),
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
