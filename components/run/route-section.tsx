"use client";

import { motion } from "motion/react";
import RouteMap from "./route-map";

function RouteSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              The 5KM Route
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              The run follows a scenic 5-kilometer loop starting and ending at Tigoi Primary School. The route takes you through the local community, giving participants a chance to enjoy the beautiful surroundings while supporting a great cause.
            </p>
            <div className="bg-primary/10 rounded-xl p-6">
              <h3 className="text-lg font-medium text-foreground mb-4">Route Highlights</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Start/Finish: Tigoi Primary School</li>
                <li>Distance: 5 Kilometers</li>
                <li>Terrain: Mixed (roads & paths)</li>
                <li>Water Points: 2 checkpoints</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <RouteMap className="h-[350px] md:h-[450px] lg:h-[500px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default RouteSection;