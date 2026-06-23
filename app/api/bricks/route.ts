import { query } from "@/lib/db";
import { client } from "@/lib/sanity";

export async function GET() {
  let liveTotal = 0;
  let sanityTotal = 0;

  try {
    const rows = await query<{ bricks: number }>(
      "SELECT bricks FROM brick_transactions WHERE status = 'completed'"
    );
    liveTotal = rows.reduce((sum, r) => sum + r.bricks, 0);
  } catch {
    liveTotal = 0;
  }

  try {
    const entries = await client.fetch<{ amount: number; currency: string }[]>(
      `*[_type == "brickEntry"]{amount, currency}`
    );

    sanityTotal = entries.reduce(
      (sum, e) =>
        sum + (e.currency === "KES" ? Math.floor(e.amount / 130) : e.amount),
      0
    );
  } catch {
    sanityTotal = 0;
  }

  return Response.json({
    total: liveTotal + sanityTotal,
    live: liveTotal,
    sanity: sanityTotal,
  });
}
