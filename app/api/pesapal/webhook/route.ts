import { getTransactionStatus } from "@/lib/api/pesapal";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const orderTrackingId = body.OrderTrackingId || body.order_tracking_id;
    const notificationType = body.NotificationType || body.notification_type;

    if (!orderTrackingId || notificationType !== "CHANGE") {
      return Response.json({ status: "ignored" });
    }

    const status = await getTransactionStatus(orderTrackingId);

    if (status.payment_status_description === "Completed") {
      const payment = {
        amount: parseFloat(status.amount) || 0,
        currency: status.currency || "KES",
        payment_ref: orderTrackingId,
        donor_email: status.email_address || "",
        donor_name: `${status.first_name || ""} ${status.last_name || ""}`.trim(),
      };

      const supabase = getSupabaseAdmin();
      await supabase.from("brick_transactions").insert({
        donor_name: payment.donor_name || undefined,
        donor_email: payment.donor_email || undefined,
        amount: payment.amount,
        currency: payment.currency,
        payment_method: "pesapal",
        payment_ref: payment.payment_ref,
        status: "completed",
      });
    }

    return Response.json({ status: "received" });
  } catch (error: any) {
    console.error("Pesapal IPN error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
