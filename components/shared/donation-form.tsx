"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HeartIcon } from "@phosphor-icons/react";
import { trackEvent } from "@/lib/track";

async function getDonationUrls() {
  const { getDonationInfo } = await import("@/lib/sanity/queries");
  const info = await getDonationInfo();
  return {
    gofundmeUrl: info?.gofundmeUrl || "",
    paypalUrl: info?.paypalUrl || "",
  };
}

function detectCountry(): "kenya" | "us" {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone && timezone.includes("Africa/Nairobi")) {
      return "kenya";
    }
  } catch (e) {
    console.log("Could not detect timezone");
  }
  return "us";
}

interface DonationFormProps {
  className?: string;
}

export function DonationForm({ className = "" }: DonationFormProps) {
  const [country, setCountry] = useState<"kenya" | "us">("us");
  const [showPayPal, setShowPayPal] = useState(false);
  const [paypalAmount, setPaypalAmount] = useState(10);
  const [donationUrls, setDonationUrls] = useState({ gofundmeUrl: "", paypalUrl: "" });

  useEffect(() => {
    const detected = detectCountry();
    setCountry(detected);
    getDonationUrls().then(setDonationUrls).catch(() => {});
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={className}
    >
      <Tabs
        value={country}
        onValueChange={(v) => {
          setCountry(v as "kenya" | "us");
          setShowPayPal(false);
          trackEvent("donation_country_switch", { country: v });
        }}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-2 mb-4 rounded-xl">
          <TabsTrigger value="kenya" className="gap-2">
            🇰🇪 Kenya (KES)
          </TabsTrigger>
          <TabsTrigger value="us" className="gap-2">
            🇺🇸 United States (USD)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kenya" className="mt-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-foreground mb-2">M-PESA Till Number</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use the Till Number below to donate via M-PESA
            </p>
            <div className="relative w-full h-[400px]">
              <img
                src="/img/til-number.jpeg"
                alt="M-PESA Till Number"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="us" className="mt-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-foreground mb-6">Donate via GoFundMe</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Tax-deductible donation through our US-based campaign
            </p>

            <a
              href={donationUrls.gofundmeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("donation_gofundme_click")}
              className="flex items-center justify-center gap-2 w-full h-12 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-base font-semibold"
            >
              <HeartIcon size={20} weight="fill" />
              Donate via GoFundMe
            </a>

            <p className="text-sm text-center text-muted-foreground mt-4">
              You will be redirected to GoFundMe to complete your donation
            </p>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-foreground mb-2">Donate via Venmo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Scan the QR code below to donate via Venmo
              </p>
              <div className="relative w-full h-[400px]">
                <img
                  src="/img/Venmo.jpeg"
                  alt="Venmo QR Code"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-foreground mb-2">Donate via CashApp</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Scan the QR code below to donate via CashApp
              </p>
              <div className="relative w-full h-[400px]">
                <img
                  src="/img/cashapp.jpeg"
                  alt="CashApp QR Code"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              {!showPayPal ? (
                <button
                  onClick={() => {
                    setShowPayPal(true);
                    trackEvent("donation_paypal_reveal");
                  }}
                  className="flex items-center justify-center gap-2 w-full h-12 bg-[#0070BA] text-white rounded-lg hover:bg-[#005ea6] transition-colors text-base font-semibold"
                >
                  <HeartIcon size={20} weight="fill" />
                  Donate via PayPal
                </button>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Make a secure donation via PayPal. Enter an amount and click below to proceed to PayPal.
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      min="5"
                      placeholder="Amount (USD)"
                      className="flex-1 h-12 px-4 text-sm border-2 border-input rounded-lg bg-background"
                      value={paypalAmount}
                      onChange={(e) => setPaypalAmount(Number(e.target.value))}
                    />
                    <button
                      onClick={async () => {
                        trackEvent("donation_paypal_order_start", { amount: paypalAmount });
                        try {
                          const res = await fetch("/api/paypal/order", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ amount: paypalAmount, currency: "USD" }),
                          });
                          const data = await res.json();
                          if (data.links) {
                            const approve = data.links.find((l: any) => l.rel === "payer-action" || l.rel === "approve");
                            if (approve?.href) window.location.href = approve.href;
                          } else if (data.id) {
                            window.open(`https://www.paypal.com/checkoutnow?token=${data.id}`, "_blank");
                          }
                        } catch {
                          window.open(donationUrls.paypalUrl || "https://www.paypal.com/ncp/payment/G9LWHXJNU2DKQ", "_blank");
                        }
                      }}
                      className="bg-[#0070BA] text-white px-6 py-3 rounded-lg hover:bg-[#005ea6] transition-colors text-sm font-semibold"
                    >
                      Pay with PayPal
                    </button>
                  </div>
                  <a
                    href={donationUrls.paypalUrl || "https://www.paypal.com/ncp/payment/G9LWHXJNU2DKQ"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("donation_paypal_direct_link")}
                    className="flex items-center justify-center gap-2 w-full h-12 border-2 border-input rounded-lg hover:bg-muted transition-colors text-base font-semibold"
                  >
                    <HeartIcon size={20} weight="fill" />
                    Open PayPal Directly
                  </a>
                  <button
                    onClick={() => {
                      setShowPayPal(false);
                      trackEvent("donation_paypal_back");
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground underline w-full text-center"
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

export default DonationForm;
