import { query } from "@/lib/db";

export async function GET() {
  try {
    const rows = await query(
      `SELECT r.*, runners.name, runners.email, runners.country
       FROM runs r
       JOIN runners ON runners.id = r.runner_id
       WHERE r.verified = false AND r.source = 'manual'
       ORDER BY r.created_at DESC`
    );

    return Response.json(rows);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
