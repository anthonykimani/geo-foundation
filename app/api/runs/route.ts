import { queryOne } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { runner_id, distance_km, source } = await request.json();

    if (!runner_id || !distance_km) {
      return Response.json(
        { error: "runner_id and distance_km are required" },
        { status: 400 }
      );
    }

    if (distance_km <= 0) {
      return Response.json(
        { error: "distance_km must be greater than 0" },
        { status: 400 }
      );
    }

    const verified = source === "gps";

    const run = await queryOne<{
      id: string;
      runner_id: string;
      distance_km: number;
      run_date: string;
      source: string;
      verified: boolean;
      created_at: string;
    }>(
      `INSERT INTO runs (runner_id, distance_km, source, verified, run_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        runner_id,
        distance_km,
        source || "manual",
        verified,
        new Date().toISOString().split("T")[0],
      ]
    );

    if (!run) throw new Error("Failed to create run");

    return Response.json(run, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
