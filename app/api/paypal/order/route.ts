import { createOrder } from "@/lib/api/paypal";

export async function POST(request: Request) {
  try {
    const { amount, currency } = await request.json();
    const order = await createOrder(amount || 10, currency || "USD");
    return Response.json(order);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
