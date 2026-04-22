import { NextRequest, NextResponse } from "next/server";

const PESAPAL_BASE_URL = process.env.PESAPAL_BASE_URL || "https://pay.pesapal.com/v3";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, ipn_notification_type } = body;

    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token || !url) {
      return NextResponse.json(
        { error: { message: "token and url are required" } },
        { status: 400 }
      );
    }

    const response = await fetch(`${PESAPAL_BASE_URL}/api/URLSetup/RegisterIPN`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url,
        ipn_notification_type: ipn_notification_type || "POST",
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(data, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Pesapal IPN registration error:", error);
    return NextResponse.json(
      { error: { message: "Failed to register IPN with Pesapal" } },
      { status: 500 }
    );
  }
}