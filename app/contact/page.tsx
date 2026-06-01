"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import BoardMemberCard from "@/components/shared/board-member-card";
import CertificateCard from "@/components/shared/certificate-card";
import PartnersPromo from "@/components/shared/partners-promo";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

async function getContactPageData() {
  const { getContactPage, getBoardMembers, getCertificates } = await import("@/lib/sanity/queries");
  const [contactPage, boardMembers, certificates] = await Promise.all([
    getContactPage(),
    getBoardMembers(),
    getCertificates(),
  ]);
  return { contactPage, boardMembers, certificates };
}

const sectionLabels: Record<string, string> = {
  board: "Board Members",
  members: "Team Members",
  volunteers: "Volunteers",
};

export default function ContactPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getContactPageData()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="container px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  const contacts = data?.contactPage?.contacts || [];
  const boardMembers = data?.boardMembers || [];
  const certificates = data?.certificates || [];

  const grouped: Record<string, Record<string, any[]>> = {};
  boardMembers.forEach((m: any) => {
    const year = m.year || "2026";
    const section = m.section || "board";
    if (!grouped[year]) grouped[year] = {};
    if (!grouped[year][section]) grouped[year][section] = [];
    grouped[year][section].push(m);
  });

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
  const defaultYear = years[0] || "";

  return (
    <main className="min-h-screen bg-background pt-20">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-foreground mb-6">
              Our Team
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated individuals behind the Gladys Erude
              Organization.
            </p>
          </motion.div>

          {boardMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No team members yet.</p>
            </div>
          ) : (
            <Accordion
              type="single"
              defaultValue={defaultYear}
              collapsible
              className="space-y-4"
            >
              {years.map((year) => (
                <AccordionItem
                  key={year}
                  value={year}
                  className="border rounded-xl overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-xl font-medium">{year}</span>
                    <span className="text-sm text-muted-foreground ml-auto mr-4">
                      {Object.values(grouped[year]).flat().length} member
                      {Object.values(grouped[year]).flat().length !== 1
                        ? "s"
                        : ""}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    {Object.entries(grouped[year])
                      .sort(([a], [b]) => {
                        const order = { board: 0, members: 1, volunteers: 2 };
                        return (
                          (order[a as keyof typeof order] ?? 9) -
                          (order[b as keyof typeof order] ?? 9)
                        );
                      })
                      .map(([section, members]) => (
                        <div key={section} className="mb-8 last:mb-0">
                          <h3 className="text-base font-medium text-muted-foreground uppercase tracking-wide mb-4">
                            {sectionLabels[section] || section}
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {members.map((member: any, index: number) => (
                              <BoardMemberCard
                                key={member._id || index}
                                id={member._id}
                                name={member.name}
                                image={member.imageUrl}
                                title={member.title}
                                bio={member.bio}
                                animationIndex={index}
                                linkPrefix="/contact"
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          {certificates.length > 0 && (
            <div className="mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-4">
                  Certificates & Permits
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Official documentation and regulatory approvals for the
                  Gladys Erude Organization.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert: any, index: number) => (
                  <CertificateCard
                    key={cert._id || index}
                    title={cert.title}
                    issuer={cert.issuer}
                    year={cert.year}
                    image={cert.imageUrl}
                    file={cert.fileUrl}
                    description={cert.description}
                    animationIndex={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <PartnersPromo />

      <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-8 text-center">
              Get in Touch
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contacts.length > 0
              ? contacts.map((contact: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-white rounded-xl shadow-sm"
                  >
                    <h3 className="text-lg font-medium text-foreground mb-3">
                      {contact.country}
                    </h3>
                    <p className="text-muted-foreground">{contact.name}</p>
                    <p className="text-muted-foreground">{contact.phone}</p>
                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-primary hover:underline text-sm"
                      >
                        {contact.email}
                      </a>
                    )}
                  </motion.div>
                ))
              : (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-white rounded-xl shadow-sm"
                  >
                    <h3 className="text-lg font-medium text-foreground mb-3">USA</h3>
                    <p className="text-muted-foreground">Sylvester Erude</p>
                    <p className="text-muted-foreground">+1 (309) 569 1606</p>
                    <a href="mailto:info@gladyserudeorganization.org" className="text-primary hover:underline text-sm">
                      info@gladyserudeorganization.org
                    </a>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-white rounded-xl shadow-sm"
                  >
                    <h3 className="text-lg font-medium text-foreground mb-3">Kenya</h3>
                    <p className="text-muted-foreground">Byron Erude</p>
                    <p className="text-muted-foreground">+254 718 069 393</p>
                    <a href="mailto:info@gladyserudeorganization.org" className="text-primary hover:underline text-sm">
                      info@gladyserudeorganization.org
                    </a>
                  </motion.div>
                </>
              )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-xl shadow-sm"
            >
              <h3 className="text-lg font-medium text-foreground mb-3">General</h3>
              <a
                href={`mailto:${data?.contactPage?.generalEmail || "info@gladyserudeorganization.org"}`}
                className="text-primary hover:underline text-sm"
              >
                {data?.contactPage?.generalEmail || "info@gladyserudeorganization.org"}
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
