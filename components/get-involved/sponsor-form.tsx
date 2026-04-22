"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SponsorForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
      >
        <h3 className="text-xl md:text-2xl font-normal text-blue-500 mb-3">
          DEAL BOOK DISPATCHED
        </h3>
        <p className="text-sm text-muted-foreground">
          A high-level overview has been routed to your liaison&apos;s email.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="p-8 sm:p-10 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
    >
      <div className="text-5xl mb-6">🏢</div>
      <h3 className="text-xl md:text-2xl font-normal text-foreground mb-3">Corporate Sponsorship</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Fund entire milestones. Sponsors receive ledger credits and permanent physical plaques on the structure.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" placeholder="Registered Enterprise Name" required className="h-12" />
        <Input type="text" placeholder="Liaison Name" required className="h-12" />
        <Input type="email" placeholder="Corporate Email" required className="h-12" />
        <Button type="submit" className="w-full mt-4 bg-white text-foreground hover:bg-gray-100">
          Request Deal Book
        </Button>
      </form>
    </motion.div>
  );
}

export default SponsorForm;