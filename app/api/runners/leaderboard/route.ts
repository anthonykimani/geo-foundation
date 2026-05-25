import { getSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data } = await supabase
      .from("runners")
      .select(`
        id,
        name,
        country,
        runs(distance_km)
      `)
      .limit(20);

    const leaderboard = (data || []).map((r) => ({
      id: r.id,
      name: r.name,
      country: r.country,
      totalKm: r.runs?.reduce((sum: number, run: any) => sum + (run.distance_km || 0), 0) || 0,
      totalBricks: r.runs?.reduce((sum: number, run: any) => sum + Math.floor((run.distance_km || 0) / 5), 0) || 0,
      totalRuns: r.runs?.length || 0,
    })).sort((a, b) => b.totalKm - a.totalKm);

    return Response.json(leaderboard);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
