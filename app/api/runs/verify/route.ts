import { query } from "@/lib/db";

export async function PUT(request: Request) {
  try {
    const { run_ids } = await request.json();

    if (!run_ids || !Array.isArray(run_ids) || run_ids.length === 0) {
      return Response.json(
        { error: "run_ids must be a non-empty array" },
        { status: 400 }
      );
    }

    const rows = await query(
      `UPDATE runs SET verified = true WHERE id = ANY($1) RETURNING *`,
      [run_ids]
    );

    return Response.json({ verified: rows.length, runs: rows });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
