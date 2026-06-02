"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import ImageGallery from "@/components/shared/image-gallery";

interface BoardMemberDetailProps {
  name: string;
  title: string;
  bio: string;
  description?: string;
  imageUrl: string | null;
  gallery?: { url: string; caption?: string }[];
}

export default function BoardMemberDetail({
  name,
  title,
  bio,
  description,
  imageUrl,
  gallery = [],
}: BoardMemberDetailProps) {
  const fullText = description || bio;

  return (
    <main className="min-h-screen bg-background pt-20">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <Link href="/contact">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeftIcon className="size-4" />
              Back to Contact
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-start">
            <div className="rounded-2xl overflow-hidden bg-gray-100">
              {gallery.length > 0 ? (
                <ImageGallery images={gallery} />
              ) : imageUrl ? (
                <div className="relative w-full aspect-[3/4]">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover object-[center_15%]"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[3/4] flex items-center justify-center bg-gray-200">
                  <span className="text-6xl text-gray-400">{name.charAt(0)}</span>
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col"
            >
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-2">
                {name}
              </h1>
              {title && (
                <p className="text-lg text-primary mb-6">{title}</p>
              )}
              <div className="prose prose-lg text-muted-foreground">
                {fullText.split("\n").map((paragraph: string, idx: number) =>
                  paragraph.trim() ? (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ) : null
                )}
              </div>
            </motion.div>
          </div>

          {gallery.length > 0 && (
            <div className="mt-4">
              <ImageGallery images={gallery} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
