import { getHomePage } from "@/lib/sanity/queries";
import { getImageUrl } from "@/lib/sanity";
import SplashContent from "@/components/coming-soon/splash-client";

export const dynamic = "force-dynamic";

export default async function ComingSoonPage() {
  const homePage = await getHomePage();
  const heroImage = getImageUrl(homePage?.heroBackgroundImage);

  return <SplashContent heroImageUrl={heroImage} />;
}
