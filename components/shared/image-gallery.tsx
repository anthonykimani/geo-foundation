"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface GalleryImage {
  url: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
}

function ImageGallery({ images, className }: ImageGalleryProps) {
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className={cn("space-y-4", className)}>
      <Carousel
        className="w-full rounded-xl overflow-hidden"
        opts={{ loop: true }}
        setApi={(carouselApi) => {
          setApi(carouselApi);
          carouselApi?.on("select", () => {
            setCurrent(carouselApi.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
                <Image
                  src={img.url}
                  alt={img.caption || `Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => {
                api?.scrollTo(index);
                setCurrent(index);
              }}
              className={cn(
                "relative flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all",
                current === index
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-60 hover:opacity-80"
              )}
            >
              <Image
                src={img.url}
                alt={img.caption || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
