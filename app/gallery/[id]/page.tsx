import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNews } from "@/lib/sanity/queries";
import { getImageUrl } from "@/lib/sanity";
import GalleryDetailClient from "./GalleryDetailClient";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const news = await getNews();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newsItem = news.find((item: any) => item._id === id || item.id?.toString() === id);

  if (!newsItem) {
    return { title: "Not Found" };
  }

  const imageUrl = getImageUrl(newsItem.imageUrl);
  const description = newsItem.excerpt?.split("\n")[0] || "";

  return {
    title: newsItem.title,
    description,
    openGraph: {
      title: newsItem.title,
      description,
      type: "article",
      ...(imageUrl && { images: [{ url: imageUrl, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: newsItem.title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const news = await getNews();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentIndex = news.findIndex((item: any) => item._id === id || item.id?.toString() === id);

  if (currentIndex === -1) {
    notFound();
  }

  const newsItem = news[currentIndex];
  const prevItem = currentIndex > 0 ? news[currentIndex - 1] : null;
  const nextItem =
    currentIndex < news.length - 1 ? news[currentIndex + 1] : null;
  const imageUrl = getImageUrl(newsItem.imageUrl);

  return (
    <GalleryDetailClient
      newsItem={newsItem}
      prevItem={prevItem}
      nextItem={nextItem}
      imageUrl={imageUrl}
    />
  );
}
