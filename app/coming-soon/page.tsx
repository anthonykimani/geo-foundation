import { getComingSoonPage } from "@/lib/sanity/queries";
import { getImageUrl } from "@/lib/sanity";
import SplashContent from "@/components/coming-soon/splash-client";

export const dynamic = "force-dynamic";

export default async function ComingSoonPage() {
  const page = await getComingSoonPage();
  const heroImage = getImageUrl(page?.heroBackgroundImage);

  return (
    <SplashContent
      heroImageUrl={heroImage}
      heading={page?.heading || "Launching Soon"}
      tagline={page?.tagline || "Build a Classroom. Brick by Brick."}
      launchDateTime={page?.launchDateTime}
    />
  );
}
