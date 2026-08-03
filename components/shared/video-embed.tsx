"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VideoEmbedProps {
  url: string;
  title?: string;
  className?: string;
  background?: boolean;
}

type VideoPlatform = "youtube" | "vimeo" | null;

export function parseVideoUrl(url: string): { platform: VideoPlatform; id: string | null } {
  const youtubeMatch =
    url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/) ||
    url.match(/^([a-zA-Z0-9_-]{11})$/);
  if (youtubeMatch) return { platform: "youtube", id: youtubeMatch[1] };

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/) || url.match(/^(\d+)$/);
  if (vimeoMatch) return { platform: "vimeo", id: vimeoMatch[1] };

  return { platform: null, id: null };
}

function VideoEmbed({ url, title = "Video", className, background }: VideoEmbedProps) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const { platform, id } = parseVideoUrl(url);

  if (!platform || !id) return null;

  const embedUrl =
    platform === "youtube"
      ? `https://www.youtube.com/embed/${id}?rel=0${background ? "&autoplay=1&mute=1&controls=0&loop=1&playlist=" + id : ""}`
      : `https://player.vimeo.com/video/${id}?${background ? "background=1&autoplay=1&loop=1&muted=1&controls=0" : ""}`;

  if (background) {
    return (
      <iframe
        ref={ref}
        src={embedUrl}
        title={title}
        className={cn(
          "absolute inset-0 w-full h-full pointer-events-none",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        style={{ objectFit: "cover" }}
        allow="autoplay; encrypted-media"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
    );
  }

  return (
    <div className={cn("relative w-full aspect-video rounded-xl overflow-hidden bg-black", className)}>
      <iframe
        ref={ref}
        src={embedUrl}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default VideoEmbed;
