"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

function MediaContacts() {
  const [contacts, setContacts] = useState<any[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { getRunPage } = await import("@/lib/sanity/queries");
      const data = await getRunPage();
      setContacts(data?.mediaContacts || []);
    }
    fetchData().catch(() => setContacts([]));
  }, []);

  if (!contacts || contacts.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-900 text-white">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-6">
            Media Contacts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contacts.map((contact: any, index: number) => (
              <div key={index}>
                <p className="text-lg text-gray-400 mb-1">
                  {contact.country} – {contact.name}
                </p>
                {contact.phone && (
                  <p className="text-lg">Tel: {contact.phone}</p>
                )}
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="text-lg text-blue-400 hover:underline">
                    {contact.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default MediaContacts;
