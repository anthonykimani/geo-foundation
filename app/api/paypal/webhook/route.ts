import { captureOrder, verifyWebhookSignature } from "@/lib/api/paypal";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headers = Object.fromEntries(request.headers.entries());

    const verified = await verifyWebhookSignature(body, headers);
    if (!verified) {
      return Response.json({ error: "Invalid signature" }, { status: 403 });
    }

    const event = JSON.parse(body);

    if (event.event_type === "CHECKOUT.ORDER.APPROVED") {
      const orderId = event.resource.id;
      const capture = await captureOrder(orderId);

      if (capture.status === "COMPLETED") {
        const unit = capture.purchase_units[0];
        const payment = unit.payments?.captures?.[0];

        const supabase = getSupabaseAdmin();
        await supabase.from("brick_transactions").insert({
          donor_name: unit.shipping?.name?.full_name || undefined,
          donor_email: payment?.payee?.email_address || undefined,
          amount: parseFloat(unit.amount.value),
          currency: unit.amount.currency_code,
          payment_method: "paypal",
          payment_ref: orderId,
          status: "completed",
        });
      }
    }

    return Response.json({ status: "received" });
  } catch (error: any) {
    console.error("PayPal webhook error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
