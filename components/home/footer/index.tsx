"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, YoutubeLogoIcon, TiktokLogoIcon } from "@phosphor-icons/react";
import Logo from "@/components/header/Logo";
import { footerNavLinks } from "@/data/components/footer";
import { socialLinks, organizationDescription } from "@/data/social";
import { contacts, generalEmail } from "@/data/organization/contact";

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
              {organizationDescription}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                  {link.icon === "facebook" && <FacebookLogoIcon size={20} />}
                  {link.icon === "instagram" && <InstagramLogoIcon size={20} />}
                  {link.icon === "tiktok" && <TiktokLogoIcon size={20} />}
                  {link.icon === "youtube" && <YoutubeLogoIcon size={20} />}
                  {link.icon === "linkedin" && <LinkedinLogoIcon size={20} />}
                </a>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 w-full xl:w-auto">
            <div className="flex flex-col gap-4">
              <p className="font-medium text-foreground">Explore</p>
              <ul className="flex flex-col gap-3">
                {footerNavLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-medium text-foreground">Contact</p>
              <div className="flex flex-col gap-2 text-muted-foreground">
                {contacts.map((contact, index) => (
                  <div key={index}>
                    <p>{contact.country}: {contact.name} {contact.phone}</p>
                  </div>
                ))}
                <a href={`mailto:${generalEmail}`} className="hover:text-foreground">
                  {generalEmail}
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