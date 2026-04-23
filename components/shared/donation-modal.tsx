"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import DonationForm from "@/components/shared/donation-form";

interface DonationModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DonationModal({ open = false, onOpenChange }: DonationModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [showChoices, setShowChoices] = useState(true);
  
  const isControlled = onOpenChange !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen;

  const handleClose = () => {
    setIsOpen(false);
    setShowChoices(true);
  };

  return (
    <>
      
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Support Our Cause</SheetTitle>
          </SheetHeader>
          <div className="p-6">
            {showChoices ? (
              <div className="space-y-4">
                <p className="text-muted-foreground mb-2">Choose how you'd like to donate:</p>
                <button
                  onClick={() => setShowChoices(false)}
                  className="w-full p-6 border-2 border-border  my-2 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="flex items-center gap-4">

                    <div>
                      <h3 className="text-lg font-medium text-foreground">Donate via Pesapal</h3>
                      <p className="text-sm text-muted-foreground">
                        Secure payment with card or mobile money
                      </p>
                    </div>
                  </div>
                </button>
                <a
                  href="https://gofund.me/323c458f"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="block w-full p-6 border-2 border-border  my-2 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center gap-4">

                    <div>
                      <h3 className="text-lg font-medium text-foreground">Donate via GoFundMe</h3>
                      <p className="text-sm text-muted-foreground">
                        Support through our GoFundMe campaign
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ) : (
              <DonationForm />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default DonationModal;