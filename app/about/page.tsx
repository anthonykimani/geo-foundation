"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";
import BoardMemberCard from "@/components/shared/board-member-card";
import { getImageUrl } from "@/lib/sanity";

async function getPageData() {
  const { getAboutPage, getBoardMembers, getValues, getContactPage } = await import("@/lib/sanity/queries");
  const [aboutPage, boardMembers, values, contactPage] = await Promise.all([
    getAboutPage(),
    getBoardMembers(),
    getValues(),
    getContactPage()
  ]);
  return { aboutPage, boardMembers, values, contactPage };
}

export default function AboutPage() {
  const [data, setData] = useState<{
    aboutPage: any;
    boardMembers: any[];
    values: any[];
    contactPage: any;
  } | null>(null);

  useEffect(() => {
    getPageData()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  const { aboutPage, boardMembers, values, contactPage } = data;
  const organizationName = aboutPage?.organizationName || "THE GLADYS ERUDE ORGANIZATION";
  const organizationSubtitle = aboutPage?.organizationSubtitle || "Empowering communities through education, healthcare, and sustainable development across Kenya.";
  const whyWeAreInspiredTitle = aboutPage?.whyWeAreInspiredTitle || "Why We Are Inspired";
  const whyWeAreInspiredContent = aboutPage?.whyWeAreInspiredContent || [];
  const missionTitle = aboutPage?.missionTitle || "Our Mission";
  const missionContent = aboutPage?.missionContent || "";
  const howWeWorkTitle = aboutPage?.howWeWorkTitle || "How We Work";
  const howWeWorkContent = aboutPage?.howWeWorkContent || "";
  const ctaTitle = aboutPage?.ctaTitle || "Join the Movement";
  const heroImageUrl = getImageUrl(aboutPage?.heroImage);

  return (
    <main className="min-h-screen bg-background">
      <section className="relative w-full h-[600px] md:h-[700px]">
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt="About GEO"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-[100px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white text-center leading-tight"
          >
            <TextGenerateEffect words={organizationName} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-white/80 text-center mt-6 max-w-xl"
          >
            {organizationSubtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              {whyWeAreInspiredTitle}
            </h2>
            {whyWeAreInspiredContent.length > 0 ? (
              whyWeAreInspiredContent.map((content: string, index: number) => (
                <p key={index} className="text-base text-muted-foreground leading-relaxed mb-4">
                  {content}
                </p>
              ))
            ) : (
              <>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  Respected Kenyan journalist and community advocate, Gladys Adisa Erude, died in August 2021 after a battle with cancer. Gladys was born in Tigoi, Vihiga County, where she attended Tigoi Primary School and Lugulu Girls High School. She trained as a teacher before making her mark as a celebrated broadcaster.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Through GEO, her six sons seek to uphold their mother&apos;s dedication to children&apos;s education and women&apos;s empowerment, and to inspire others and mobilise support.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              {missionTitle}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {missionContent || "By 2030, GEO aims to empower at least 10,000 women and children in underserved communities across Kenya."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-8">
            Our Values
          </h2>
          {values && values.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value: any, index: number) => (
                <motion.div
                  key={value._id || index}
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Equality", "Integrity", "Respect"].map((val, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                >
                  <h3 className="text-xl font-medium text-foreground mb-3">{val}</h3>
                  <p className="text-sm text-muted-foreground">Our core value.</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              {howWeWorkTitle}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {howWeWorkContent || "We work with affiliated partners, local and civic leaders to identify challenges and opportunities in focus regions of Kenya."}
            </p>
          </motion.div>
        </div>
      </section>

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
              {ctaTitle}
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

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
                Our Board
              </h2>
              <p className="text-muted-foreground mb-6">
                Meet our dedicated board members who guide GEO&apos;s mission.
              </p>
              {boardMembers && boardMembers.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {boardMembers.slice(0, 8).map((member: any, index: number) => (
                    <BoardMemberCard
                      key={member._id || index}
                      name={member.name}
                      image={member.imageUrl}
                      title={member.title}
                      bio={member.bio}
                      animationIndex={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
                Contact Us
              </h2>
              <div className="space-y-4 mb-6">
                {contactPage?.contacts && contactPage.contacts.length > 0 ? (
                  contactPage.contacts.map((contact: any, index: number) => (
                    <div key={index}>
                      <p className="text-sm text-muted-foreground">{contact.country}</p>
                      <p className="text-foreground">{contact.name} {contact.phone}</p>
                    </div>
                  ))
                ) : (
                  <>
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
                      <p className="text-foreground">{contactPage?.generalEmail || "gemrunkenya@gmail.com"}</p>
                    </div>
                  </>
                )}
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