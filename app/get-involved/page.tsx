"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Hero from "@/components/get-involved/hero";
import InvolvementCard from "@/components/get-involved/involvement-card";
import VolunteerForm from "@/components/get-involved/volunteer-form";
import SponsorForm from "@/components/get-involved/sponsor-form";
import { DonationModal } from "@/components/shared/donation-modal";
import { HeartIcon } from "@phosphor-icons/react";
import { urlFor } from "@/lib/sanity";

async function getGetInvolvedPageData() {
  const { getGetInvolvedPage } = await import("@/lib/sanity/queries");
  return getGetInvolvedPage();
}

function GetInvolvedPage() {
  const [data, setData] = useState<any>(null);
  const [donateOpen, setDonateOpen] = useState(false);

  useEffect(() => {
    getGetInvolvedPageData()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const shareToSocials = () => {
    const text = data?.shareText || "Support the Gladys Erude Organization! Together we can empower women and children in underserved communities across Kenya. Join us in making a difference. #GEO #Charity #Kenya";
    const url = data?.shareUrl || "https://gladyserudeorganization.org";
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent("Gladys Erude Organization")}&summary=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    };

    window.open(shareUrls.facebook, "_blank");
  };

  if (!data) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <Hero />
        <div className="container px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <Hero />
      <DonationModal open={donateOpen} onOpenChange={setDonateOpen}/>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(data.cards || []).map((card: any, index: number) => (
              <InvolvementCard
                key={index}
                image={card.image}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                variant={card.variant || "secondary"}
                onClick={() => {
                  if (card.buttonUrl?.startsWith('http')) {
                    window.open(card.buttonUrl, "_blank");
                  } else if (card.buttonUrl?.startsWith('mailto:')) {
                    window.location.href = card.buttonUrl;
                  } else {
                    setDonateOpen(true);
                  }
                }}
                animationIndex={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-primary/5">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-4">
            {data.ctaTitle || "Ready to Make a Difference?"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {data.ctaDescription || "Your support helps us empower women and children in underserved communities across Kenya."}
          </p>
          <button 
            onClick={() => setDonateOpen(true)}
            className="bg-primary text-white text-lg px-8 py-5 rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <HeartIcon size={24} weight="fill" className="text-white" />
            {data.ctaButtonText || "Donate Now"}
          </button>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-8 text-center">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">USA</h3>
              <p className="text-muted-foreground">Sylvester Erude</p>
              <p className="text-muted-foreground">+1 (309) 569 1606</p>
              <a href="mailto:silvester@gladyserudeorganization.org" className="text-primary hover:underline">Email</a>
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">Kenya</h3>
              <p className="text-muted-foreground">Byron Erude</p>
              <p className="text-muted-foreground">+254 718 069 393</p>
              <a href="mailto:byron@gladyserudeorganization.org" className="text-primary hover:underline">Email</a>
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">General</h3>
              <a href="mailto:info@gladyserudeorganization.org" className="text-primary hover:underline">info@gladyserudeorganization.org</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default GetInvolvedPage;