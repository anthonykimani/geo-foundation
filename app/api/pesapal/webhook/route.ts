import { getTransactionStatus } from "@/lib/api/pesapal";
import { query } from "@/lib/db";

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

      await query(
        `INSERT INTO brick_transactions (donor_name, donor_email, amount, currency, payment_method, payment_ref, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          payment.donor_name || null,
          payment.donor_email || null,
          payment.amount,
          payment.currency,
          "pesapal",
          payment.payment_ref,
          "completed",
        ]
      );
    }

    return Response.json({ status: "received" });
  } catch (error: any) {
    console.error("Pesapal IPN error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
