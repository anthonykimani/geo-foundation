import { queryOne } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, country } = await request.json();

    if (!name || !email) {
      return Response.json({ error: "Name and email are required" }, { status: 400 });
    }

    const runner = await queryOne<{
      id: string;
      name: string;
      email: string;
      country: string;
      created_at: string;
    }>(
      "INSERT INTO runners (name, email, country) VALUES ($1, $2, $3) RETURNING *",
      [name, email, country || "Kenya"]
    );

    if (!runner) throw new Error("Failed to create runner");

    return Response.json(runner, { status: 201 });
  } catch (error: any) {
    if (error.code === "23505") {
      return Response.json({ error: "Email already registered" }, { status: 409 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}
