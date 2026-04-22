"use client";

import { motion } from "motion/react";
import DonationForm from "@/components/shared/donation-form";

function DonationInfo() {
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
              To Support Us
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your donation directly impacts the lives of women and children in underserved 
              communities across Kenya. Every contribution brings us closer to our goal of 
              transforming education and providing essential services.
            </p>
            
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-medium text-foreground mb-4">Alternative Payment Methods</h3>
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">M-PESA</p>
                  <p>Pay Bill: 522522</p>
                  <p>Account: 1332946089</p>
                </div>
                <div className="pt-2">
                  <p className="font-medium text-foreground">Kenya Commercial Bank</p>
                  <p>Account: 1332946089</p>
                  <p>Account Name: GLADYS ADISA ERUDE FOUNDATION</p>
                </div>
                <div className="pt-2">
                  <a
                    href="https://gofund.me/323c458f"
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