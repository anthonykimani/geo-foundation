"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { getImageUrl, getFileUrl } from "@/lib/sanity";

interface CertificateCardProps {
  title: string;
  issuer: string;
  year: string;
  image?: any;
  file?: any;
  description?: string;
  animationIndex?: number;
}

function CertificateCard({
  title,
  issuer,
  year,
  image,
  file,
  description,
  animationIndex = 0,
}: CertificateCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const bottomAnimation = {
    initial: { y: 30, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 },
    transition: { duration: 0.4, delay: animationIndex * 0.05 },
  };

  const imageSrc = getImageUrl(image);
  const fileUrl = getFileUrl(file);

  return (
    <motion.div
      ref={ref}
      {...bottomAnimation}
      className="bg-white rounded-xl overflow-hidden shadow-sm border flex flex-col"
    >
      <div className="relative w-full aspect-[4/3] bg-gray-100">
        {imageSrc ? (
          <a
            href={imageSrc}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover hover:opacity-90 transition-opacity"
            />
          </a>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl text-gray-400">📜</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-muted-foreground mb-1">{year}</span>
        <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{issuer}</p>
        {description && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
        )}
        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            View Document
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default CertificateCard;
