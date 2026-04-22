import { NextResponse } from "next/server";

const PESAPAL_BASE_URL = process.env.PESAPAL_BASE_URL || "https://pay.pesapal.com/v3";
const CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY || "";
const CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET || "";

export async function POST() {
  if (!CONSUMER_KEY || !CONSUMER_SECRET || CONSUMER_KEY.startsWith("your_")) {
    return NextResponse.json(
      { error: { message: "Invalid or missing Pesapal credentials" } },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${PESAPAL_BASE_URL}/api/Auth/RequestToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ consumer_key: CONSUMER_KEY, consumer_secret: CONSUMER_SECRET }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(data, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Pesapal auth error:", error);
    return NextResponse.json(
      { error: { message: "Failed to authenticate with Pesapal" } },
      { status: 500 }
    );
  }
}