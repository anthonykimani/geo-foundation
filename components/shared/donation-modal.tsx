"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import DonationForm from "@/components/shared/donation-form";
import { HeartIcon } from "@phosphor-icons/react";

interface DonationModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DonationModal({ open = false, onOpenChange }: DonationModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isControlled = onOpenChange !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-x-hidden">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              Support Our Cause
            </SheetTitle>
          </SheetHeader>
          <DonationForm />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default DonationModal;