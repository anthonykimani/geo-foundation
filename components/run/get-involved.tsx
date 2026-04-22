"use client";

import Link from "next/link";
import { motion } from "motion/react";

function GetInvolved() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
            Get Involved
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            The 2026 event will take place at Tigoi Primary School on 6th September. You are invited to get involved as a participant, community partner, corporate partner, government partner or by donating.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-xl font-medium text-foreground mb-3">Take Part in the 5K Run</h3>
            <p className="text-muted-foreground mb-4">
              If you are a keen runner or simply want to experience the fun and fresh air, please take part in the memorial run. Entry is free.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdGsGAGpe9EdCwEcHmC2ugxYRHq9EUsaPs5NLffPOtvs57IHw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Register Now
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-xl font-medium text-foreground mb-3">Become a Partner</h3>
            <p className="text-muted-foreground mb-4">
              Local businesses, community groups and government agencies are welcome to enquire about how they could become an event partner.
            </p>
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              Contact Us
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-xl font-medium text-foreground mb-3">Make a Donation</h3>
            <p className="text-muted-foreground mb-4">
              GEO will raise funds to stage this community event and carry out targeted improvements to local school buildings.
            </p>
            <a
              href="https://gofund.me/323c458f"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              Donate
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default GetInvolved;