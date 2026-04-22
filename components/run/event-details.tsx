"use client";

import { motion } from "motion/react";

function EventDetails() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-primary/10 rounded-2xl p-8 md:p-12"
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
        Event Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Date</p>
          <p className="text-xl font-medium text-foreground">September 6th, 2026</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Time</p>
          <p className="text-xl font-medium text-foreground">7:00 AM</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Location</p>
          <p className="text-xl font-medium text-foreground">Tigoi Primary School</p>
        </div>
      </div>
    </motion.div>
  );
}

export default EventDetails;