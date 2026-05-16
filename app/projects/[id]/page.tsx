import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/sanity/queries";
import { getImageUrl } from "@/lib/sanity";
import ImpactDetailClient from "@/app/impact/[id]/ImpactDetailClient";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const projects = await getProjects();

  const project = projects.find(
    (p: any) => p._id === id || p.id?.toString() === id
  );

  if (!project) {
    return { title: "Not Found" };
  }

  const imageUrl = getImageUrl(project.imageUrl);
  const description = project.description || "";

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      type: "article",
      ...(imageUrl && {
        images: [{ url: imageUrl, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const projects = await getProjects();

  const project = projects.find(
    (p: any) => p._id === id || p.id?.toString() === id
  );

  if (!project) {
    notFound();
  }

  const projectImageUrl = getImageUrl(project.imageUrl);

  const relatedProjects = projects
    .filter((p: any) => p._id !== project._id)
    .slice(0, 3);

  return (
    <ImpactDetailClient
      project={project}
      impactItem={null}
      relatedProjects={relatedProjects}
      projectImageUrl={projectImageUrl}
      impactImageUrl={null}
      notFound={false}
    />
  );
}
