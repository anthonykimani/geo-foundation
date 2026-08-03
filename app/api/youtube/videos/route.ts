import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

const CHANNEL_ID = "UCFuqM6VMvGbm_0eydGBbHeA";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

interface FeedEntry {
  id: string;
  "yt:videoId": string;
  title: string;
  link: { "@_rel"?: string; "@_href": string } | { "@_rel"?: string; "@_href": string }[];
  "media:group"?: {
    "media:thumbnail"?: { "@_url"?: string } | { "@_url"?: string }[];
  };
  published?: string;
}

interface FeedDocument {
  feed?: {
    entry?: FeedEntry | FeedEntry[];
  };
}

export async function GET() {
  try {
    const res = await fetch(FEED_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`YouTube feed responded ${res.status}`);
    const xml = await res.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    });
    const data = parser.parse(xml) as FeedDocument;
    const entries = data?.feed?.entry;
    const list = Array.isArray(entries) ? entries : entries ? [entries] : [];

    const videos = list.slice(0, 3).map((entry) => {
      const videoId = entry["yt:videoId"];
      const links = Array.isArray(entry.link) ? entry.link : [entry.link];
      const watch = links.find((l) => l["@_rel"] === "alternate")?.["@_href"];
      const thumbnails = entry["media:group"]?.["media:thumbnail"];
      const thumb = Array.isArray(thumbnails)
        ? thumbnails[0]?.["@_url"]
        : thumbnails?.["@_url"];
      return {
        id: videoId,
        title: entry.title,
        url: watch || `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: thumb || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        publishedAt: entry.published || null,
      };
    });

    return NextResponse.json({ videos, channelUrl: `https://www.youtube.com/channel/${CHANNEL_ID}` });
  } catch (error) {
    console.error("Failed to fetch YouTube feed:", error);
    return NextResponse.json({ videos: [], channelUrl: `https://www.youtube.com/channel/${CHANNEL_ID}` });
  }
}
