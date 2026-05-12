"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "@phosphor-icons/react";

interface GalleryLightboxProps {
  image: StaticImageData;
  index: number;
  total: number;
  onClose: () => void;
  onChange: (delta: number) => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function GalleryLightbox({
  image,
  index,
  total,
  onClose,
  onChange,
}: GalleryLightboxProps) {
  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <button
          className="absolute inset-0 z-10 cursor-default bg-black/80 backdrop-blur-xl"
          onClick={onClose}
          aria-label="Close gallery"
        />

        <div className="relative z-20 flex w-full max-w-5xl items-center justify-center px-4">
          <AnimatePresence mode="wait" custom={0}>
            <motion.div
              key={index}
              custom={0}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative w-full"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                <Image
                  src={image}
                  alt={`Gallery photo ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-center pb-8">
          <div className="flex items-center gap-4 rounded-full bg-black/60 px-6 py-3 backdrop-blur-lg">
            <button
              onClick={() => onChange(-1)}
              disabled={index === 0}
              className="rounded-full p-2 text-white/75 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous image"
            >
              <ArrowLeftIcon className="size-5" />
            </button>

            <span className="text-sm text-white/80 tabular-nums min-w-[4rem] text-center">
              {index + 1} / {total}
            </span>

            <button
              onClick={() => onChange(1)}
              disabled={index === total - 1}
              className="rounded-full p-2 text-white/75 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next image"
            >
              <ArrowRightIcon className="size-5" />
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-30 rounded-full bg-black/60 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
          aria-label="Close gallery"
        >
          <XIcon className="size-5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
