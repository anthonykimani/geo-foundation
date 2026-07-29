import { auth } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";
import { aggregateStats } from "@/lib/journey";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.runner_id) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const runner = await queryOne<{
      id: string;
      name: string;
      email: string;
      country: string;
      avatar_url: string;
      created_at: string;
    }>("SELECT * FROM runners WHERE id = $1", [session.runner_id]);

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
      "SELECT distance_km::float, run_date, verified, source, created_at FROM runs WHERE runner_id = $1 ORDER BY created_at DESC",
      [runner.id]
    );

    const stats = aggregateStats(runs);

    return Response.json({ runner, stats, recentRuns: runs.slice(0, 10) });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
