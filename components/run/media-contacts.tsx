"use client";

import { motion } from "motion/react";

function MediaContacts() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-900 text-white">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-6">
            Media Contacts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-400 mb-1">USA – Silvester Erude</p>
              <p className="text-lg">Tel: +1 (309) 569 1606</p>
            </div>
            <div>
              <p className="text-lg text-gray-400 mb-1">Kenya – Byron Erude</p>
              <p className="text-lg">Tel: +254 718 069 393</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default MediaContacts;