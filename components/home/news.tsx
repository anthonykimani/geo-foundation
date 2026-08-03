"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Play } from "@phosphor-icons/react";
import { trackEvent } from "@/lib/track";

interface ChannelVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  publishedAt: string | null;
}

async function getVideos() {
  const { getYoutubeVideos } = await import("@/lib/youtube");
  return getYoutubeVideos();
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function News() {
  const [videos, setVideos] = useState<ChannelVideo[]>([]);
  const [channelUrl, setChannelUrl] = useState<string>(
    "https://www.youtube.com/@GladysErudeOrganization/videos"
  );

  useEffect(() => {
    getVideos()
      .then((data) => {
        setVideos(data.videos || []);
        if (data.channelUrl) setChannelUrl(data.channelUrl);
      })
      .catch(() => setVideos([]));
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-4">
              Latest Videos
            </h2>
            <p className="text-lg text-muted-foreground">
              Watch the latest from the Gladys Erude Organization on YouTube
            </p>
          </div>
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("home_youtube_channel_click")}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View on YouTube
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video: ChannelVideo, index: number) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("home_video_click", { title: video.title, id: video.id })}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center justify-center size-14 rounded-full bg-white/90 shadow-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      <Play weight="fill" className="size-6 ml-1" />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    {formatDate(video.publishedAt)}
                  </p>
                  <h3 className="text-lg font-medium text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            </a>
          ))}
        </div>

        {videos.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No videos available yet. Check back soon!
          </div>
        )}
      </div>
    </section>
  );
}

export default News;