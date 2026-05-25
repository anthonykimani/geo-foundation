import { submitOrderRequest } from "@/lib/api/pesapal";

export async function POST(request: Request) {
  try {
    const { amount, currency, email, firstName, lastName, phone, description } =
      await request.json();

    const order = await submitOrderRequest({
      amount,
      currency: currency || "KES",
      description: description || "GEO Donation",
      email,
      firstName,
      lastName,
      phoneNumber: phone,
      reference: `GEO-${Date.now()}`,
    });

    return Response.json(order);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
