import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects, getImpactAreas } from "@/lib/sanity/queries";
import { getImageUrl } from "@/lib/sanity";
import ImpactDetailClient from "./ImpactDetailClient";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const [projects, impactAreas] = await Promise.all([
    getProjects(),
    getImpactAreas(),
  ]);

  const project = projects.find(
    (p: any) => p._id === id || p.id?.toString() === id
  );
  const impactItem = impactAreas?.impacts?.find(
    (item: any) => item._key === id
  );

  const title = project?.title || impactItem?.title || "";
  const description =
    project?.description || impactItem?.description || "";
  const imageUrl = project?.imageUrl
    ? getImageUrl(project.imageUrl)
    : impactItem?.imageUrl
      ? getImageUrl(impactItem.imageUrl)
      : null;

  if (!title) {
    return { title: "Not Found" };
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      ...(imageUrl && {
        images: [{ url: imageUrl, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const [projects, impactAreas] = await Promise.all([
    getProjects(),
    getImpactAreas(),
  ]);

  const project = projects.find(
    (p: any) => p._id === id || p.id?.toString() === id
  );
  const impactItem = impactAreas?.impacts?.find(
    (item: any) => item._key === id
  );

  if (!project && !impactItem) {
    notFound();
  }

  const projectImageUrl = project?.imageUrl
    ? getImageUrl(project.imageUrl)
    : null;
  const impactImageUrl = impactItem?.imageUrl
    ? getImageUrl(impactItem.imageUrl)
    : null;

  const relatedProjects = project
    ? projects.filter((p: any) => p._id !== project._id).slice(0, 3)
    : [];

  return (
    <ImpactDetailClient
      project={project || null}
      impactItem={impactItem || null}
      relatedProjects={relatedProjects}
      projectImageUrl={projectImageUrl}
      impactImageUrl={impactImageUrl}
      notFound={false}
    />
  );
}
