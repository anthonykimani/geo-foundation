"use client";

import { motion } from "motion/react";
import RegistrationForm from "./registration-form";

function DetailsWithForm() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-primary/10 rounded-2xl p-10 md:p-14"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-8">
              Event Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Date</p>
                <p className="text-xl font-medium text-foreground">September 6th, 2026</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Time</p>
                <p className="text-xl font-medium text-foreground">7:00 AM</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Location</p>
                <p className="text-xl font-medium text-foreground">Tigoi Primary School</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <RegistrationForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DetailsWithForm;