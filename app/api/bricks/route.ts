import { getSupabase } from "@/lib/supabase";
import { client } from "@/lib/sanity";

export async function GET() {
  let liveTotal = 0;
  let sanityTotal = 0;

  try {
    const supabase = getSupabase();
    const { data } = await supabase
      .from("brick_transactions")
      .select("bricks")
      .eq("status", "completed");

    liveTotal = data?.reduce((sum: number, r: any) => sum + r.bricks, 0) ?? 0;
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
