import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBoardMembers } from "@/lib/sanity/queries";
import { getImageUrl } from "@/lib/sanity";
import BoardMemberDetail from "./BoardMemberDetail";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const members = await getBoardMembers();
  const member = members.find((m: any) => m._id === id);

  if (!member) {
    return { title: "Not Found" };
  }

  const imageUrl = getImageUrl(member.imageUrl);

  return {
    title: member.name,
    description: member.bio || member.title || "",
    openGraph: {
      title: member.name,
      description: member.bio || member.title || "",
      type: "profile",
      ...(imageUrl && {
        images: [{ url: imageUrl, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: member.name,
      description: member.bio || member.title || "",
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const members = await getBoardMembers();
  const member = members.find((m: any) => m._id === id);

  if (!member) {
    notFound();
  }

  const imageUrl = getImageUrl(member.imageUrl);
  const gallery = member?.gallery
    ?.map((g: any) => {
      const url = getImageUrl(g.image);
      return url ? { url, caption: g.caption } : null;
    })
    .filter(Boolean) || [];

  return (
    <BoardMemberDetail
      name={member.name}
      title={member.title}
      bio={member.bio}
      description={member.description}
      imageUrl={imageUrl}
      gallery={gallery}
    />
  );
}
