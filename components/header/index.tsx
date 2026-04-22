"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import HeaderLink from "./Navigation/HeaderLink";
import Logo from "./Logo";
import MobileHeader from "./Navigation/MobileHeader";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { headerData } from "@/lib/layout-data";
import { DonationModal } from "@/components/shared/donation-modal";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full max-w-[100vw] overflow-hidden transition-all duration-300  text-nowrap ${scrolled
            ? "backdrop-blur-xl bg-white/70 dark:bg-dark_black/70 shadow-[0_1px_0_0_rgba(15,28,63,0.06)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
            : ""
          }`}
      >
        <div className="container p-3 sm:p-4">
          <div className="flex items-center justify-between px-0 sm:px-2">
            {/* ── Logo: standalone, independent of nav ── */}
            <Logo />

            {/* ── Nav pill + actions: separate element ── */}
            <NavigationMenu className="hidden lg:flex bg-navy/5 dark:bg-white/5 rounded-full p-1">
              <NavigationMenuList className="flex gap-0 2xl:gap-1.5 list-none">
                {headerData.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <HeaderLink item={item} />
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-3">

              <div className="hidden lg:flex items-center gap-2">
                <DonationModal />
              </div>

              <div className="hidden max-lg:flex">
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger render={<button />}>
                    <ListIcon size={24} />
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="bg-white dark:bg-navy border-none p-0 max-w-xs"
                    showCloseButton={false}
                  >
                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    <div className="flex items-center justify-between p-4">
                      <p className="text-lg font-bold">Menu</p>
                      <SheetClose
                        render={<button aria-label="Close mobile menu" />}
                      >
                        <XIcon size={24} />
                      </SheetClose>
                    </div>
                    <div className="p-4">
                      <ul className="flex flex-col">
                        {headerData.map((item, index) => (
                          <SheetClose key={index} className={'w-fit'}>
                            <MobileHeader item={item} />
                          </SheetClose>
                        ))}
                        <div className="flex flex-col gap-3 px-2 mt-2">
                          <DonationModal />
                        </div>
                      </ul>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
