import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

const DONATIONS_FILE = join(process.cwd(), "data", "donations.json");

interface Donation {
  id: string;
  source: "pesapal" | "gofundme" | "manual";
  amount: number;
  currency: string;
  date: string;
  name?: string;
  email?: string;
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
    const dir = join(process.cwd(), "data");
    writeFileSync(DONATIONS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing donations:", error);
  }
}

export async function GET() {
  const data = readDonations();
  
  const totalKES = data.donations
    .filter(d => d.currency === "KES" && d.source !== "gofundme")
    .reduce((sum, d) => sum + d.amount, 0);
  
  const totalUSD = data.donations
    .filter(d => d.currency === "USD" || d.source === "gofundme")
    .reduce((sum, d) => sum + d.amount, 0);

  const exchangeRate = 150;
  const totalBricks = Math.floor((totalKES + (totalUSD * exchangeRate)) / 100);

  return NextResponse.json({
    totalKES,
    totalUSD,
    totalBricks,
    donationCount: data.donations.length,
    lastUpdated: data.lastUpdated,
    recentDonations: data.donations.slice(-10).reverse(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { source, amount, currency, name, email } = body;

    if (!source || !amount || !currency) {
      return NextResponse.json(
        { error: "Missing required fields: source, amount, currency" },
        { status: 400 }
      );
    }

    const data = readDonations();
    
    const donation: Donation = {
      id: `DON-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      source,
      amount,
      currency,
      date: new Date().toISOString(),
      name,
      email,
    };

    data.donations.push(donation);
    data.lastUpdated = new Date().toISOString();
    
    writeDonations(data);

    return NextResponse.json({
      success: true,
      donation,
      message: "Donation recorded successfully",
    });
  } catch (error) {
    console.error("Error recording donation:", error);
    return NextResponse.json(
      { error: "Failed to record donation" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, source = "manual" } = body;

    if (!amount || !currency) {
      return NextResponse.json(
        { error: "Missing required fields: amount, currency" },
        { status: 400 }
      );
    }

    const data = readDonations();
    
    const donation: Donation = {
      id: `MANUAL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      source,
      amount,
      currency,
      date: new Date().toISOString(),
    };

    data.donations.push(donation);
    data.lastUpdated = new Date().toISOString();
    
    writeDonations(data);

    return NextResponse.json({
      success: true,
      donation,
      message: "Manual donation added successfully",
    });
  } catch (error) {
    console.error("Error adding manual donation:", error);
    return NextResponse.json(
      { error: "Failed to add manual donation" },
      { status: 500 }
    );
  }
}