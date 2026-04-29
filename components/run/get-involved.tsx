"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { getInvolved } from "@/data/pages/run";

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
            {getInvolved.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {getInvolved.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getInvolved.cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-medium text-foreground mb-3">
                {card.title}
              </h3>
              <p className="text-muted-foreground mb-4">{card.description}</p>
              {card.buttonUrl.startsWith("http") ? (
                <a
                  href={card.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  {card.buttonText}
                </a>
              ) : (
                <Link
                  href={card.buttonUrl}
                  className="inline-flex items-center justify-center px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground"
                >
                  {card.buttonText}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GetInvolved;