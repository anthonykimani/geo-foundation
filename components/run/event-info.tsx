"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Img2 } from "@/constants/img";

function EventInfo() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Gladys Erude Memorial Run 2026
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We are excited to invite you to our Annual Gladys Erude Memorial 5K Run/Walk, a special event dedicated to supporting improvements of schools across Kenya. Bring your friends and family for a day of fun, fitness, and making a real difference.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              This year, funds raised will support <strong>St. Michael's School in Kilifi County</strong> - an underserved rural community along the coast. Your participation will help enhance facilities, expand educational resources, and create greater opportunities for students who need it most.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              If you can't join us for the run/walk, you can still contribute to this worthy cause. Every donation, no matter the size, brings us closer to our goal. Your support is invaluable!
            </p>
            <p className="text-lg text-primary font-medium">
              Pamoja! Dreams are made by action. #GladysErude5K #RunWalkForACause
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden"
          >
            <Image
              src={Img2.src}
              alt="Run Event"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default EventInfo;