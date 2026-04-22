"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";
import { Button } from "@/components/ui/button";
import { Img1 } from "@/constants/img";

const boardMembers = [
  { name: "Alex Gonzo" },
  { name: "Byron Erude" },
  { name: "Chrispin Ng'ang'a" },
  { name: "Emily Sang" },
  { name: "Gloria Miseri" },
  { name: "Julius Ngombo" },
  { name: "Maxwell Erude" },
  { name: "Purity Chepkirui" },
  { name: "Roy Oduor" },
  { name: "Silvester Erude" },
  { name: "Tony K. Erude" },
  { name: "Valentine Masila" },
  { name: "Victor E Lidaywa" },
];

function ContactPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1240px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-8">
              Contact Us
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl md:text-2xl font-medium text-foreground mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">USA</h3>
                  <p className="text-muted-foreground">Sylvester Erude</p>
                  <p className="text-muted-foreground">+1 (309) 569 1606</p>
                  <a href="mailto:silvester@gladyserudeorganization.org" className="text-primary hover:underline">Email</a>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Kenya</h3>
                  <p className="text-muted-foreground">Byron Erude</p>
                  <p className="text-muted-foreground">+254 718 069 393</p>
                  <a href="mailto:byron@gladyserudeorganization.org" className="text-primary hover:underline">Email</a>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">General</h3>
                  <a href="mailto:info@gladyserudeorganization.org" className="text-primary hover:underline">info@gladyserudeorganization.org</a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-medium text-foreground mb-6">
                Our Board
              </h2>
              <p className="text-muted-foreground mb-6">
                Meet our dedicated board members who guide GEO&apos;s mission.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {boardMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mb-2 mx-auto flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                    <p className="text-xs text-foreground truncate">{member.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;