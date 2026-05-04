"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import BoardMemberCard from "@/components/shared/board-member-card";

async function getContactPageData() {
  const { getContactPage, getBoardMembers } = await import("@/lib/sanity/queries");
  const [contactPage, boardMembers] = await Promise.all([getContactPage(), getBoardMembers()]);
  return { contactPage, boardMembers };
}

function ContactPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getContactPageData()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const contacts = data?.contactPage?.contacts || [];
  const boardMembers = data?.boardMembers || [];

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
                {contacts.length > 0 ? (
                  contacts.map((contact: any, index: number) => (
                    <div key={index}>
                      <h3 className="text-lg font-medium text-foreground mb-2">{contact.country}</h3>
                      <p className="text-muted-foreground">{contact.name}</p>
                      <p className="text-muted-foreground">{contact.phone}</p>
                      {contact.email && (
                        <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a>
                      )}
                    </div>
                  ))
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-medium text-foreground mb-6">
                Our Board
              </h2>
              <p className="text-muted-foreground mb-6">
                Meet our dedicated board members who guide GEO&apos;s mission.
              </p>
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;