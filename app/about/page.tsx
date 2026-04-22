"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";
import { Button } from "@/components/ui/button";
import { RoyTeamImg, EmilyTeamImg, AlexTeamImg, MaxTeamImg, Img1, GeoLogo } from "@/constants/img";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdGsGAGpe9EdCwEcHmC2ugxYRHq9EUsaPs5NLffPOtvs57IHw/viewform";

const boardMembers = [
  { name: "Alex Gonzo", image: AlexTeamImg.src },
  { name: "Byron Erude", image: GeoLogo.src },
  { name: "Chrispin Ng'ang'a", image: GeoLogo.src },
  { name: "Emily Sang", image: EmilyTeamImg.src },
  { name: "Gloria Miseri", image: GeoLogo.src },
  { name: "Julius Ngombo", image: GeoLogo.src },
  { name: "Maxwell Erude", image: MaxTeamImg.src },
  { name: "Purity Chepkirui", image: GeoLogo.src },
  { name: "Roy Oduor", image: RoyTeamImg.src },
  { name: "Silvester Erude", image: GeoLogo.src },
  { name: "Tony K. Erude", image: GeoLogo.src },
  { name: "Valentine Masila", image: GeoLogo.src },
  { name: "Victor E Lidaywa", image: GeoLogo.src },
];

const values = [
  { title: "Equality", description: "We believe that everyone should have equitable access to essential life sustaining services." },
  { title: "Integrity", description: "We have a deep passion for the mission and transparency is at the forefront of what we do. We are fair with colleagues, partners, and to those we serve." },
  { title: "Respect", description: "We value all people equally regardless of tribe, race, sex, religion, or gender." },
];

function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero with full-width image */}
      <section className="relative w-full h-[600px] md:h-[700px]">
        <Image
          src={Img1.src}
          alt="About GEO"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-[100px]">

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white text-center leading-tight"
          >
            <TextGenerateEffect words="THE GLADYS ERUDE ORGANIZATION" />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-white/80 text-center mt-6 max-w-xl"
          >
            Empowering communities through education, healthcare, and sustainable development across Kenya.
          </motion.p>
        </div>
      </section>

      {/* Content sections - centered narrow layout */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Why We Are Inspired
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              Respected Kenyan journalist and community advocate, Gladys Adisa Erude, died in August 2021 after a battle with cancer. Gladys was born in Tigoi, Vihiga County, where she attended Tigoi Primary School and Lugulu Girls High School. She trained as a teacher before making her mark as a celebrated broadcaster.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Through GEO, her six sons seek to uphold their mother&apos;s dedication to children&apos;s education and women&apos;s empowerment, and to inspire others and mobilise support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              By 2030, GEO aims to empower at least 10,000 women and children in underserved communities across Kenya by providing access to essential services such as education, healthcare, and economic opportunities. Founded in 2022, GEO is a non-profit organization registered in the United States with active partnerships in Kenya.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <h3 className="text-xl font-medium text-foreground mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              How We Work
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              We work with affiliated partners, local and civic leaders, including residents, to identify the challenges and opportunities in focus regions of Kenya and find creative methods to garner resources, both through individual donors and organizations, to address essential requirements and needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Green CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-primary">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1240px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-primary rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-white mb-4">
              Join the Movement
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Be part of something bigger. Together we can make a lasting impact on communities across Kenya.
            </p>
            <Link href="/get-involved" className="inline-block bg-white text-primary hover:bg-gray-100 px-6 py-2 rounded-full transition-colors">
              Get Involved
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Board & Contact */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Board */}
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
                Our Board
              </h2>
              <p className="text-muted-foreground mb-6">
                Meet our dedicated board members who guide GEO&apos;s mission.
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {boardMembers.slice(0, 8).map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mb-2 bg-gray-200 mx-auto">
                      <Image src={member.image} alt={member.name} fill className="object-cover" />
                    </div>
                    <p className="text-xs text-foreground truncate">{member.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
                Contact Us
              </h2>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">USA</p>
                  <p className="text-foreground">Sylvester Erude +1 (309) 569 1606</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Kenya</p>
                  <p className="text-foreground">Byron Erude +254 718 069 393</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground">gemrunkenya@gmail.com</p>
                </div>
              </div>
              <Link href="/contact" className="bg-primary text-white hover:bg-primary/90 px-6 py-2 rounded-full inline-flex items-center">
                Connect With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;