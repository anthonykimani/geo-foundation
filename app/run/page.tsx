"use client";

import { motion } from "motion/react";
import Hero from "@/components/run/hero";
import EventHighlights from "@/components/run/event-highlights";
import EventInfo from "@/components/run/event-info";
import DonationInfo from "@/components/run/donation-info";
import ImpactStats from "@/components/run/impact-stats";
import GetInvolved from "@/components/run/get-involved";
import AboutRun from "@/components/run/about-run";
import MediaContacts from "@/components/run/media-contacts";
import RegistrationForm from "@/components/run/registration-form";
import RouteMap from "@/components/run/route-map";

function RunPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <Hero />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-8">
            The 5KM Route
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <RouteMap className="h-[350px] md:h-[450px] lg:h-[500px]" />
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

      <EventHighlights />

      <EventInfo />

      <DonationInfo />

      <ImpactStats />

      <GetInvolved />

      <AboutRun />

      <MediaContacts />
    </main>
  );
}

export default RunPage;