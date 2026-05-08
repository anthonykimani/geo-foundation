"use client";

import { useState, useCallback, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "motion/react";
import GalleryLightbox from "./gallery-lightbox";

interface GalleryGridProps {
  images: StaticImageData[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lastViewedIndex, setLastViewedIndex] = useState<number | null>(null);

  const openLightbox = useCallback(
    (index: number) => setSelectedIndex(index),
    []
  );
  const closeLightbox = useCallback(() => {
    setLastViewedIndex(selectedIndex);
    setSelectedIndex(null);
  }, [selectedIndex]);

  const changeIndex = useCallback(
    (delta: number) => {
      if (selectedIndex === null) return;
      const next = selectedIndex + delta;
      if (next >= 0 && next < images.length) {
        setSelectedIndex(next);
      }
    },
    [selectedIndex, images.length]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") changeIndex(-1);
      if (e.key === "ArrowRight") changeIndex(1);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, closeLightbox, changeIndex]);

  const selectedSrc =
    selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        {images.map((img, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
            viewport={{ once: true }}
            onClick={() => openLightbox(index)}
            className="group relative mb-4 block w-full cursor-zoom-in overflow-hidden rounded-xl after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
            aria-label={`View gallery photo ${index + 1}`}
          >
            <Image
              src={img}
              alt={`Gallery photo ${index + 1}`}
              className="w-full transform rounded-xl brightness-90 transition duration-300 will-change-auto group-hover:brightness-110 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
              placeholder="blur"
            />
          </motion.button>
        ))}
      </div>

      {selectedSrc !== null && (
        <GalleryLightbox
          image={selectedSrc}
          index={selectedIndex!}
          total={images.length}
          onClose={closeLightbox}
          onChange={changeIndex}
        />
      )}
    </>
  );
}
