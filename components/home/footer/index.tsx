"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CaretRightIcon } from "@phosphor-icons/react";
import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, TwitterLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react";
import Logo from "@/components/header/Logo";

const footerLinks = {
  explore: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Support", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms Of Service", href: "#" },
  ],
  follow: [
    { label: "Facebook", href: "#", icon: FacebookLogoIcon },
    { label: "Instagram", href: "#", icon: InstagramLogoIcon },
    { label: "X", href: "#", icon: TwitterLogoIcon },
    { label: "LinkedIn", href: "#", icon: LinkedinLogoIcon },
  ],
  legal: [
    { label: "Terms of service", href: "#" },
    { label: "Privacy policy", href: "#" },
    { label: "FAQ", href: "#" },
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
              Join the Movement to a start impacting lives around you
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:opacity-60">
                <FacebookLogoIcon size={20} />
              </Link>
              <Link href="#" className="hover:opacity-60">
                <InstagramLogoIcon size={20} />
              </Link>
              <Link href="#" className="hover:opacity-60">
                <TwitterLogoIcon size={20} />
              </Link>
              <Link href="#" className="hover:opacity-60">
                <LinkedinLogoIcon size={20} />
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 w-full xl:w-auto">
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
              <p className="font-medium text-foreground">Support</p>
              <ul className="flex flex-col gap-3">
                {footerLinks.support.map((link, index) => (
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
              <p className="text-muted-foreground">
                Kenya
              </p>
              <Link href="mailto:info@geofoundation.org" className="text-muted-foreground hover:text-foreground">
                info@geofoundation.org
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center mt-8">
          <p className="text-muted-foreground text-sm">
            © 2026. GEO Foundation All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;