"use client";

import { motion } from "motion/react";

function AboutRun() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
            About the GEM Run
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Following the success of the inaugural 5 km Gladys Erude Memorial Run (GEM Run) held in 2022 at Tigoi Primary School, the event has since grown into an annual flagship initiative. Each year, this event brings together the community as a celebration of health, unity, and purpose.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            This vibrant community event blends fun, fitness, and free medical screenings while raising funds to support infrastructure improvements in schools across educational facilities in Vihiga and Nandi Counties, Western Kenya.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The GEM Run is organized by the Gladys Erude Organization (GEO), a non-profit founded in 2022 and registered in the United States, with an affiliate presence in Kenya. GEO's initiative aligns with our core mission to empower women and children in underserved communities by providing essential, life-sustaining services.
          </p>
          <p className="text-lg text-primary font-medium">
            Pamoja! Dreams are made by action. #GladysErude5K #RunWalkForACause #RenovateTigoiPrimary #CharityRun
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutRun;