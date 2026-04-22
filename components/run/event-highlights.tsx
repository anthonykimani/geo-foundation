"use client";

import { motion } from "motion/react";

function EventHighlights() {
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
            Gladys Erude Memorial Run 2025
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            We are proud to share that the Gladys Erude Memorial Run at Tigoi Primary School was a great success! As the Organizing Board, we extend our heartfelt gratitude to everyone who made this event truly memorable. Your support and participation helped us honor the legacy of Gladys Erude in a meaningful and impactful way.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-8"
        >
          <h3 className="text-xl font-medium text-foreground mb-4">
            A special thank you goes to:
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>The dedicated nurses who generously volunteered their time to run a free medical camp for the local community</li>
            <li>The school management and teachers of Tigoi Primary School for their unwavering support</li>
            <li>The residents of Tigoi for their warm hospitality and encouragement</li>
            <li>AFC Leopards – Sabatia Branch, for their active and spirited participation</li>
            <li>Our valued donors, whose contributions helped bring the event to life</li>
            <li>Our esteemed partner, Hasbah Kenya Limited, for their generous donation of sanitary towels to all teenage girls in the area</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg text-muted-foreground mb-4">
            We are truly grateful to everyone who came together to make this event a success. We look forward to welcoming you again next year for another inspiring and impactful Gladys Erude Memorial Run.
          </p>
          <p className="text-lg font-medium text-foreground">With gratitude, The Organizing Board</p>
        </motion.div>
      </div>
    </section>
  );
}

export default EventHighlights;