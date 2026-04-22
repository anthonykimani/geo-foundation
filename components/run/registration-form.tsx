"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RegistrationFormProps {
  onSuccess?: () => void;
}

function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onSuccess?.();
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center p-10 sm:p-14 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
      >
        <div className="text-6xl mb-6">🏃</div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-4">
          YOU&apos;RE IN.
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-6">
          Your Runner ID has been securely logged.<br />
          Every step you take will build this classroom.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Register Another Runner
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="p-10 sm:p-14 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
    >
      <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-3">
        GET ON THE STARTING LINE.
      </h2>
      <p className="text-muted-foreground mb-10 text-lg">
        Fill out the manifest to secure your runner ID.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 ">
        <Input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="h-14 text-lg"
        />
        <Input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="h-14 text-lg"
        />
        <Input
          type="tel"
          placeholder="Phone Number (Required for Tracker Sync)"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          className="h-14 text-lg"
        />

        <Button
          type="submit"
          className="w-full h-14 mt-6 text-lg bg-primary text-white hover:bg-primary/90"
        >
          SECURE MY SPOT
        </Button>
      </form>
    </motion.div>
  );
}

export default RegistrationForm;