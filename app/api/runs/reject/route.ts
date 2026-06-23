import { query } from "@/lib/db";

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        { error: "id query parameter is required" },
        { status: 400 }
      );
    }

    await query("DELETE FROM runs WHERE id = $1", [id]);

    return Response.json({ deleted: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
