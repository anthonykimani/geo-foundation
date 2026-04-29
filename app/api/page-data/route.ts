import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    avatars: [],
    message: "No additional data available",
  });
}