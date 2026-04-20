"use client";
import React, { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

const OFFSET = 100; // Adjust this value based on your fixed header height

// Hook to manage the active link and apply offset
const useActiveLink = (setActiveLink: (link: string) => void) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const updateActiveLink = () => {
      const fullPath = window.location.hash
        ? `${pathname}${window.location.hash}`
        : pathname;
      setActiveLink(fullPath);
    };

    updateActiveLink();

    window.addEventListener("hashchange", updateActiveLink);

    return () => {
      window.removeEventListener("hashchange", updateActiveLink);
    };
  }, [pathname, searchParams, setActiveLink]);
};

// HeaderLink component
const HeaderLinkContent: React.FC<{ item: any }> = ({ item }) => {
  const [activeLink, setActiveLink] = useState("");

  useActiveLink(setActiveLink);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (item.href.startsWith("#") || item.href.includes("#")) {
      const targetId = item.href.split("#")[1];
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - OFFSET,
          behavior: "smooth",
        });
        window.history.pushState(null, "", item.href);
        setActiveLink(item.href);
      }
    }
  };

  return (
    <NavigationMenuLink
      render={<Link href={item.href} onClick={handleClick} />}
      className={`px-4 py-2 text-base font-medium hover:text-black dark:hover:text-black hover:bg-white hover:rounded-3xl hover:shadow-header_shadow   
                    ${activeLink === item.href
          ? "bg-white text-black rounded-3xl shadow-header_shadow focus:bg-white"
          : "text-navy/60 dark:text-white focus:bg-white"
        }`}
    >
      {item.label}
    </NavigationMenuLink>
  );
};

// Wrap in Suspense
const HeaderLink: React.FC<{ item: any }> = ({ item }) => (
  <Suspense fallback={null}>
    <HeaderLinkContent item={item} />
  </Suspense>
);

export default HeaderLink;
