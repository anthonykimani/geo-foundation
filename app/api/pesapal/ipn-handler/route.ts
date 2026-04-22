import { NextRequest, NextResponse } from "next/server";

const PESAPAL_BASE_URL = process.env.PESAPAL_BASE_URL || "https://cybqa.pesapal.com/pesapalv3";

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderTrackingId = searchParams.get("orderTrackingId");
    const orderMerchantReference = searchParams.get("OrderMerchantReference");
    const orderNotificationType = searchParams.get("OrderNotificationType");

    if (!orderTrackingId) {
      return NextResponse.json(
        { error: { message: "Missing orderTrackingId" } },
        { status: 400 }
      );
    }

    const token = request.headers.get("x-pesapal-token");

    if (!token) {
      return NextResponse.json(
        { error: { message: "Missing authentication token" } },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log("Pesapal IPN received:", {
      orderTrackingId,
      orderMerchantReference,
      orderNotificationType,
      paymentStatus: data.payment_status_description,
    });

    if (data.error) {
      return NextResponse.json(data, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Pesapal IPN error:", error);
    return NextResponse.json(
      { error: { message: "Failed to process IPN" } },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}