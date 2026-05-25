interface PesapalToken {
  token: string;
  expiry: number;
}

let cachedToken: PesapalToken | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiry) {
    return cachedToken.token;
  }

  const res = await fetch(
    `${process.env.PESAPAL_BASE_URL}/api/Auth/RequestToken`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
      }),
    }
  );

  const data = await res.json();
  cachedToken = {
    token: data.token,
    expiry: Date.now() + (data.expiryDate ? new Date(data.expiryDate).getTime() : 3600000) - 60000,
  };

  return cachedToken.token;
}

export interface PesapalOrder {
  id: string;
  amount: number;
  currency: string;
  description: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  redirect_url: string;
  notification_id: string;
}

export async function submitOrderRequest(params: {
  amount: number;
  currency: string;
  description: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  reference: string;
}): Promise<PesapalOrder> {
  const token = await getAccessToken();
  const ipnUrl = process.env.PESAPAL_IPN_URL || "https://gladyserudeorganization.org/api/pesapal/webhook";

  const body = {
    id: params.reference,
    currency: params.currency,
    amount: params.amount,
    description: params.description,
    callback_url: "https://gladyserudeorganization.org/get-involved?payment=success",
    cancellation_url: "https://gladyserudeorganization.org/get-involved?payment=cancelled",
    redirect_mode: "",
    notification_id: ipnUrl,
    billing_address: {
      email_address: params.email || "",
      phone_number: params.phoneNumber || "",
      first_name: params.firstName || "",
      last_name: params.lastName || "",
    },
  };

  const res = await fetch(
    `${process.env.PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();

  if (data.error) {
    throw new Error(`Pesapal error: ${JSON.stringify(data.error)}`);
  }

  return {
    id: data.order_tracking_id,
    amount: params.amount,
    currency: params.currency,
    description: params.description,
    redirect_url: data.redirect_url,
    notification_id: data.merchant_reference,
  };
}

export async function getTransactionStatus(orderTrackingId: string) {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.json();
}
