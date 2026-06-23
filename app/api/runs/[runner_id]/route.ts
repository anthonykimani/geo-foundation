import { query } from "@/lib/db";

export async function GET(
  _request: Request,
  context: { params: Promise<{ runner_id: string }> }
) {
  try {
    const { runner_id } = await context.params;

    const rows = await query(
      "SELECT * FROM runs WHERE runner_id = $1 ORDER BY created_at DESC",
      [runner_id]
    );

    return Response.json(rows);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
