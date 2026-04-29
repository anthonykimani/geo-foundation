"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqData } from "@/data/components/faq";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQData {
  header?: {
    label: string;
    title: string;
    subtitle: string;
  };
  tabs?: {
    label: string;
  }[];
  faqs: FAQItem[];
}

interface FAQProps {
  data?: FAQData;
}

function FAQ({ data }: FAQProps) {
  const content = data || faqData;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="w-full bg-background">
      <div className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm text-foreground mb-6">
            <span className="flex -space-x-2">
              <span className="w-6 h-6 rounded-full bg-muted border-2 border-background" />
              <span className="w-6 h-6 rounded-full bg-muted border-2 border-background" />
              <span className="w-6 h-6 rounded-full bg-muted border-2 border-background" />
            </span>
            {content.header?.label || "Frequently asked questions"}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-[72px] leading-tight font-normal text-foreground font-sans">
            <TextGenerateEffect
              words={content.header?.title || "Got questions?\nWe've got answers!"}
            />
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-md mx-auto">
            {content.header?.subtitle || "Discover answers to common questions about our events, processes, and more. We're happy to help!"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          <div className="flex-shrink-0">
            {content.tabs?.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === index
                    ? "bg-foreground text-white"
                    : "bg-transparent text-foreground"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1">
            <Accordion type="single" defaultValue="item-0" collapsible>
              {content.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;