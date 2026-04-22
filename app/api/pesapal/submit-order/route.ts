import { NextRequest, NextResponse } from "next/server";

const PESAPAL_BASE_URL = process.env.PESAPAL_BASE_URL || "https://cybqa.pesapal.com/pesapalv3";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      token,
      id,
      currency,
      amount,
      description,
      callback_url,
      notification_id,
      first_name,
      last_name,
      email,
      phone,
    } = body;

    if (!token || !id || !currency || !amount || !description || !callback_url || !notification_id) {
      return NextResponse.json(
        { error: { message: "Missing required fields" } },
        { status: 400 }
      );
    }

    const orderData = {
      id,
      currency,
      amount: parseFloat(amount),
      description,
      callback_url,
      redirect_mode: "TOP_WINDOW",
      notification_id,
      billing_address: {
        email_address: email || "",
        phone_number: phone || "",
        country_code: "KE",
        first_name: first_name || "",
        last_name: last_name || "",
      },
    };

    const response = await fetch(`${PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(data, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Pesapal submit order error:", error);
    return NextResponse.json(
      { error: { message: "Failed to submit order to Pesapal" } },
      { status: 500 }
    );
  }
}