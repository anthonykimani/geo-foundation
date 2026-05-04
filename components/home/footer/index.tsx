"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, YoutubeLogoIcon, TiktokLogoIcon } from "@phosphor-icons/react";
import Logo from "@/components/header/Logo";

const footerNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Impact", href: "/impact" },
  { label: "Gallery", href: "/gallery" },
  { label: "Run", href: "/run" },
  { label: "Jiwe Kwa Jiwe", href: "/jiwe-kwa-jiwe" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

async function getFooterData() {
  const { getSiteSettings, getSocialLinks, getContactPage } = await import("@/lib/sanity/queries");
  const [siteSettings, socialLinks, contactPage] = await Promise.all([getSiteSettings(), getSocialLinks(), getContactPage()]);
  return { siteSettings, socialLinks, contactPage };
}

function Footer() {
  const [footerData, setFooterData] = useState<any>({
    siteSettings: null,
    socialLinks: [],
    contactPage: null
  });

  useEffect(() => {
    getFooterData()
      .then(setFooterData)
      .catch(() => {
        setFooterData({
          siteSettings: null,
          socialLinks: [],
          contactPage: null
        });
      });
  }, []);

  const { siteSettings, socialLinks, contactPage } = footerData;
  const organizationDescription = siteSettings?.organizationDescription || "";
  const generalEmail = siteSettings?.generalEmail || "info@gladyserudeorganization.org";
  const contacts = contactPage?.contacts || [];

  const getIcon = (icon: string) => {
    switch (icon) {
      case "facebook": return <FacebookLogoIcon size={20} />;
      case "instagram": return <InstagramLogoIcon size={20} />;
      case "tiktok": return <TiktokLogoIcon size={20} />;
      case "youtube": return <YoutubeLogoIcon size={20} />;
      case "linkedin": return <LinkedinLogoIcon size={20} />;
      default: return null;
    }
  };

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
              {organizationDescription || "Empowering communities through education, healthcare, and sustainable development across Kenya."}
            </p>
            <div className="flex gap-4">
              {socialLinks.length > 0 ? (
                socialLinks.map((link: any, index: number) => (
                  <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                    {getIcon(link.icon)}
                  </a>
                ))
              ) : (
                <>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                    <FacebookLogoIcon size={20} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                    <InstagramLogoIcon size={20} />
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                    <TiktokLogoIcon size={20} />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                    <YoutubeLogoIcon size={20} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                    <LinkedinLogoIcon size={20} />
                  </a>
                </>
              )}
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
                {contacts.length > 0 ? (
                  contacts.map((contact: any, index: number) => (
                    <div key={index}>
                      <p>{contact.country}: {contact.name} {contact.phone}</p>
                    </div>
                  ))
                ) : (
                  <p>Kenya: +254 712 345 678</p>
                )}
                <a href={`mailto:${generalEmail}`} className="hover:text-foreground">
                  {generalEmail}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center mt-8">
          <p className="text-muted-foreground text-sm">
            © 2026 {siteSettings?.organizationName || "Gladys Erude Organization"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;