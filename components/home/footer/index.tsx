"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, YoutubeLogoIcon, TiktokLogoIcon } from "@phosphor-icons/react";
import Logo from "@/components/header/Logo";

const footerLinks = {
  explore: [
    { label: "Home", href: "/" },
    { label: "Memorial Run", href: "/run" },
    { label: "About", href: "/about" },
    { label: "News", href: "/gallery" },
    { label: "Impact", href: "/impact" },
    { label: "Get Involved", href: "/get-involved" },
  ],
  follow: [
    { label: "Facebook", href: "https://www.facebook.com/thegladyserudeorganization", icon: "facebook" },
    { label: "Instagram", href: "https://www.instagram.com/thegladyserudeorganization", icon: "instagram" },
    { label: "TikTok", href: "https://www.tiktok.com/@g.e.o_01", icon: "tiktok" },
    { label: "YouTube", href: "https://youtube.com/@GladysErudeOrganization", icon: "youtube" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/the-gladys-erude-organization-geo", icon: "linkedin" },
  ],
};

function Footer() {
  return (
    <footer className="w-full bg-[#fcfcfc] xl:pt-20 pb-6 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col xl:flex-row py-10 sm:py-16 gap-8 sm:gap-10 justify-between items-start xl:items-center border-b border-navy/10"
        >
          <div className="flex flex-col gap-4 sm:gap-6 max-w-md">
            <Logo />
            <p className="opacity-60 text-base sm:text-lg text-foreground">
              Empowering women and children in underserved communities across Kenya through education, health programs, and community development.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/thegladyserudeorganization" target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                <FacebookLogoIcon size={20} />
              </a>
              <a href="https://www.instagram.com/thegladyserudeorganization" target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                <InstagramLogoIcon size={20} />
              </a>
              <a href="https://www.tiktok.com/@g.e.o_01" target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                <TiktokLogoIcon size={20} />
              </a>
              <a href="https://youtube.com/@GladysErudeOrganization" target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                <YoutubeLogoIcon size={20} />
              </a>
              <a href="https://www.linkedin.com/in/the-gladys-erude-organization-geo" target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                <LinkedinLogoIcon size={20} />
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 w-full xl:w-auto">
            <div className="flex flex-col gap-4">
              <p className="font-medium text-foreground">Explore</p>
              <ul className="flex flex-col gap-3">
                {footerLinks.explore.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-medium text-foreground">Contact</p>
              <div className="flex flex-col gap-2 text-muted-foreground">
                <p>USA: Sylvester Erude +1 (309) 569 1606</p>
                <p>Kenya: Byron Erude +254 718 069 393</p>
                <a href="mailto:info@gladyserudeorganization.org" className="hover:text-foreground">
                  info@gladyserudeorganization.org
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center mt-8">
          <p className="text-muted-foreground text-sm">
            © 2026 Gladys Erude Organization. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;