"use client";

import Link from "next/link";
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  TiktokLogoIcon,
  YoutubeLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { WhiteLogo } from "@/constants/svg";
import Countdown from "./countdown";
import Image from "next/image";

const socialLinks = [
  { icon: FacebookLogoIcon, href: "https://www.facebook.com/thegladyserudeorganization", label: "Facebook" },
  { icon: InstagramLogoIcon, href: "https://www.instagram.com/thegladyserudeorganization", label: "Instagram" },
  { icon: TiktokLogoIcon, href: "https://www.tiktok.com/@g.e.o_01", label: "TikTok" },
  { icon: YoutubeLogoIcon, href: "https://youtube.com/@GladysErudeOrganization", label: "YouTube" },
  { icon: LinkedinLogoIcon, href: "https://www.linkedin.com/in/the-gladys-erude-organization-geo", label: "LinkedIn" },
];

export default function SplashContent({
  heroImageUrl,
}: {
  heroImageUrl: string | null;
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      {heroImageUrl && (
        <img
          src={heroImageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      )}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center px-4 text-center text-white">
        <div className="flex flex-col items-center gap-8 max-w-2xl">
          <Image
            src={WhiteLogo}
            alt="Gladys Erude Organization"
            className="h-14 sm:h-20 w-auto"
          />

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            A New Chapter of Impact Begins Soon
          </h1>

          <div className="w-16 h-px bg-white/30" />

          <p className="text-base sm:text-lg text-white max-w-md">
            Build a Classroom. Brick by Brick.
          </p>

          <Countdown />

          <div className="flex items-center gap-4 mt-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors duration-300"
                aria-label={label}
              >
                <Icon size={22} />
              </Link>
            ))}
          </div>

          <p className="text-xs text-white/60 mt-6">
            &copy; {new Date().getFullYear()} Gladys Erude Organization
          </p>
        </div>
      </div>
    </div>
  );
}
