"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface DonationFormProps {
  presetAmounts?: number[];
}

interface PesapalToken {
  token: string;
  expiryDate: string;
}

interface PesapalIpn {
  ipn_id: string;
  url: string;
}

export function DonationForm({ presetAmounts = [500, 1000, 2500, 5000, 10000] }: DonationFormProps) {
  const [amount, setAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState<PesapalToken | null>(null);
  const [ipnId, setIpnId] = useState<string>("");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initializePesapal();
  }, []);

  async function initializePesapal() {
    if (initialized) return;
    
    try {
      setIsLoading(true);
      
      const authResponse = await fetch("/api/pesapal/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const authData = await authResponse.json();

      if (authData.token) {
        setToken(authData);
        
        const ipnResponse = await fetch("/api/pesapal/ipn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authData.token}`,
          },
          body: JSON.stringify({
            token: authData.token,
            url: `${window.location.origin}/api/pesapal/ipn-handler`,
            ipn_notification_type: "POST",
          }),
        });

        const ipnData = await ipnResponse.json();
        if (ipnData.ipn_id) {
          setIpnId(ipnData.ipn_id);
        }
        
        setInitialized(true);
      } else if (authData.error) {
        setError("Payment system unavailable. Please use alternative payment method.");
      }
    } catch (err) {
      console.error("Failed to initialize Pesapal:", err);
      setError("Payment system unavailable. Please use alternative payment method.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!amount || !firstName || !lastName || !email) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (!token || !ipnId) {
      setError("Payment system not ready. Please refresh the page and try again.");
      setIsLoading(false);
      return;
    }

    try {
      const orderId = `GEO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const response = await fetch("/api/pesapal/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token.token,
          id: orderId,
          currency: "KES",
          amount,
          description: `Donation to Gladys Erude Organization - ${firstName} ${lastName}`,
          callback_url: `${window.location.origin}/donation/success?reference=${orderId}`,
          notification_id: ipnId,
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
        }),
      });

      const data = await response.json();

      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        setError("Failed to create payment. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleQuickDonate = (quickAmount: number) => {
    setAmount(quickAmount.toString());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-8 shadow-sm"
    >
      <h3 className="text-xl font-medium text-foreground mb-6">Make a Donation</h3>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {presetAmounts.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => handleQuickDonate(amt)}
            className={`h-12 border rounded-md transition-colors ${
              amount === amt.toString()
                ? "bg-primary text-white border-primary"
                : "border-input hover:bg-primary/10 hover:border-primary"
            }`}
          >
            KES {amt.toLocaleString()}
          </button>
        ))}
      </div>

      <form onSubmit={handleDonate} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">First Name *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full h-12 px-4 border border-input rounded-md bg-background"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Last Name *</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full h-12 px-4 border border-input rounded-md bg-background"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-1">Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 px-4 border border-input rounded-md bg-background"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-1">Phone (for M-PESA)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-12 px-4 border border-input rounded-md bg-background"
            placeholder="0722 123456"
          />
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-1">Amount (KES) *</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="10"
            className="w-full h-12 px-4 border border-input rounded-md bg-background"
            placeholder="Enter amount"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isLoading || !initialized}
          className="w-full h-12 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Donate via Pesapal"}
        </button>

        <p className="text-xs text-muted-foreground text-center">
          Secured by Pesapal. You will be redirected to complete payment.
        </p>
      </form>
    </motion.div>
  );
}

export default DonationForm;