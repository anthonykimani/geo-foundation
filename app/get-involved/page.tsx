"use client";

import { useState } from "react";
import Link from "next/link";
import Hero from "@/components/get-involved/hero";
import InvolvementCard from "@/components/get-involved/involvement-card";
import VolunteerForm from "@/components/get-involved/volunteer-form";
import SponsorForm from "@/components/get-involved/sponsor-form";
import { DonationModal } from "@/components/shared/donation-modal";

function GetInvolvedPage() {
  const [donateOpen, setDonateOpen] = useState(false);

  const shareToSocials = () => {
    const text = "Support the Gladys Erude Organization! Together we can empower women and children in underserved communities across Kenya. Join us in making a difference. #GEO #Charity #Kenya";
    const url = "https://gladyserudeorganization.org";
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent("Gladys Erude Organization")}&summary=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    };

    window.open(shareUrls.facebook, "_blank");
  };

  return (
    <main className="min-h-screen bg-background pt-20">
      <Hero />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* 1. DONATE */}
            <InvolvementCard
              icon="❤️"
              title="Make a Donation"
              description="Support our mission to empower women and children in underserved communities across Kenya. All donations are tax-deductible."
              buttonText="Donate Now"
              variant="primary"
              onClick={() => setDonateOpen(true)}
              animationIndex={0}
            />

            {/* 2. RUN */}
            <InvolvementCard
              icon="🏃"
              title="Join the Memorial Run"
              description="Participate in our annual 5K run. Every step helps build classrooms for children in need."
              buttonText="Register"
              variant="secondary"
              onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSdGsGAGpe9EdCwEcHmC2ugxYRHq9EUsaPs5NLffPOtvs57IHw/viewform", "_blank")}
              animationIndex={1}
            />

            {/* 3. VOLUNTEER */}
            <VolunteerForm />

            {/* 4. SPONSOR */}
            <SponsorForm />

            {/* 5. PARTNER */}
            <InvolvementCard
              icon="🤝"
              title="Become a Partner"
              description="Partner with us to expand our impact. We welcome corporations, NGOs, and government agencies."
              buttonText="Contact Us"
              variant="secondary"
              onClick={() => window.location.href = "mailto:info@gladyserudeorganization.org?subject=Partnership%20Inquiry"}
              animationIndex={4}
            />

            {/* 6. SHARE */}
            <InvolvementCard
              icon="📢"
              title="Spread the Word"
              description="Share our mission with your network. Help us reach more communities that need support."
              buttonText="Share"
              variant="outline"
              onClick={shareToSocials}
              animationIndex={5}
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-primary/5">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your support helps us empower women and children in underserved communities across Kenya.
          </p>
          <button 
            onClick={() => setDonateOpen(true)}
            className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors"
          >
            Donate Now
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