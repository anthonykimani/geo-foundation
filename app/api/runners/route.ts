import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { name, email, country } = await request.json();

    if (!name || !email) {
      return Response.json({ error: "Name and email are required" }, { status: 400 });
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("runners")
      .insert({ name, email, country: country || "Kenya" })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return Response.json({ error: "Email already registered" }, { status: 409 });
      }
      throw error;
    }

    return Response.json(data, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
