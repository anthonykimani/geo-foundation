"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import DonationForm from "@/components/shared/donation-form";

async function getRunPageData() {
  const { getRunPage } = await import("@/lib/sanity/queries");
  return getRunPage();
}

function DonationInfo() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getRunPageData()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const donationInfo = data || {
    title: "Make a Donation",
    description: "Your donation helps us build classrooms and support education initiatives in Kenya.",
    alternativePayments: {
      title: "Alternative Payments",
      mpesa: { paybill: "123456", account: "GEO" },
      bank: { name: "Bank", account: "1234567890", accountName: "GEO Foundation" },
      gofundme: "https://gofund.me/323c458f"
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              {donationInfo.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {donationInfo.description}
            </p>

            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-medium text-foreground mb-4">
                {donationInfo.alternativePayments?.title || "Alternative Payments"}
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">M-PESA</p>
                  <p>Pay Bill: {donationInfo.alternativePayments?.mpesa?.paybill || "123456"}</p>
                  <p>Account: {donationInfo.alternativePayments?.mpesa?.account || "GEO"}</p>
                </div>
                <div className="pt-2">
                  <p className="font-medium text-foreground">
                    {donationInfo.alternativePayments?.bank?.name || "Bank Transfer"}
                  </p>
                  <p>Account: {donationInfo.alternativePayments?.bank?.account || "1234567890"}</p>
                  <p>Account Name: {donationInfo.alternativePayments?.bank?.accountName || "GEO Foundation"}</p>
                </div>
                <div className="pt-2">
                  <a
                    href={donationInfo.alternativePayments?.gofundme || "https://gofund.me/323c458f"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Donate via GoFundMe →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <DonationForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DonationInfo;