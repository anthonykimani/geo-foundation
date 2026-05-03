import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

const PESAPAL_BASE_URL = process.env.PESAPAL_BASE_URL || "https://cybqa.pesapal.com/pesapalv3";
const DONATIONS_FILE = join(process.cwd(), "data", "donations.json");

interface Donation {
  id: string;
  source: "pesapal" | "gofundme" | "manual";
  amount: number;
  currency: string;
  date: string;
  name?: string;
  email?: string;
  orderId?: string;
}

interface DonationsData {
  donations: Donation[];
  lastUpdated: string;
}

function readDonations(): DonationsData {
  try {
    if (existsSync(DONATIONS_FILE)) {
      const data = readFileSync(DONATIONS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading donations:", error);
  }
  return { donations: [], lastUpdated: new Date().toISOString() };
}

function writeDonations(data: DonationsData): void {
  try {
    writeFileSync(DONATIONS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing donations:", error);
  }
}

async function saveDonation(amount: number, currency: string, orderId?: string) {
  const data = readDonations();
  
  const donation: Donation = {
    id: `PESAPAL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    source: "pesapal",
    amount,
    currency,
    date: new Date().toISOString(),
    orderId,
  };

  data.donations.push(donation);
  data.lastUpdated = new Date().toISOString();
  
  writeDonations(data);
  console.log("Donation saved:", donation);
}

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
      amount: data.amount,
      currency: data.currency,
    });

    if (data.error) {
      return NextResponse.json(data, { status: 400 });
    }

    if (data.payment_status_description === "Completed" || data.payment_status_description === "Successful") {
      const amount = parseFloat(data.amount) || 0;
      const currency = data.currency || "KES";
      
      if (amount > 0) {
        await saveDonation(amount, currency, orderMerchantReference || undefined);
      }
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