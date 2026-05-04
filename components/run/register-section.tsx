"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import RegistrationForm from "./registration-form";
import { getImageUrl } from "@/lib/sanity";

async function getRunPageData() {
  const { getRunPage } = await import("@/lib/sanity/queries");
  return getRunPage();
}

function RegisterSection() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getRunPageData()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const registrationImage = data?.registrationImage;
  const registrationImageUrl = getImageUrl(registrationImage);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full h-[300px] md:h-[400px] lg:h-full rounded-2xl overflow-hidden hidden lg:block"
          >
            {registrationImageUrl ? (
              <Image
                src={registrationImageUrl}
                alt="Register"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </motion.div>
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}

export default RegisterSection;