"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function VolunteerForm() {
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
        <h3 className="text-xl md:text-2xl font-normal text-teal-brand mb-3">
          APPLICATION RECEIVED
        </h3>
        <p className="text-sm text-muted-foreground">
          Logistics will parse your data and contact you via email shortly.
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
      <div className="text-5xl mb-6">🥾</div>
      <h3 className="text-xl md:text-2xl font-normal text-foreground mb-3">Boots on the Ground</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Submit your manifest to logistics. We require organizers, physical laborers, and digital strategists.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" placeholder="Legal Name" required className="h-12" />
        <Input type="email" placeholder="Primary Email" required className="h-12" />
        <Input type="tel" placeholder="Phone Contact" required className="h-12" />
        <Select required>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select Deployment Function" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Labor">Physical Labor (Site Build)</SelectItem>
            <SelectItem value="Logistics">Event Logistics (Run)</SelectItem>
            <SelectItem value="Digital">Digital / PR Strategy</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" variant="outline" className="w-full mt-4">
          Submit Application
        </Button>
      </form>
    </motion.div>
  );
}

export default VolunteerForm;