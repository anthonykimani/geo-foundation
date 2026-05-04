import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  apiVersion: "2024-01-01",
  dataset: "production",
  projectId: "v180y67k",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) return null;
  return builder.image(source);
}

export function getImageUrl(source: any): string | null {
  if (!source) return null;
  if (typeof source === "string" && source.trim() !== "") return source;
  if (source._type === "image") {
    const url = builder.image(source).url();
    if (url && url.trim() !== "") return url;
  }
  return null;
}